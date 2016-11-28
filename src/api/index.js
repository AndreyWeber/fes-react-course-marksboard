import { fromJS, Map } from 'immutable';
import camelCase from 'camel-case';

import config from './api.config.js';

/**
* Constants
**/
const tabs = {
    reviews: 'Reviews',
    division: 'Division',
    points: 'Points',
    students: 'Students',
    mentors: 'Mentors',
    lessons: 'Lessons',
    tasks: 'Tasks'
};

const HEADER_RANGE = '1:1';
const DATA_RANGE = '2:1000';

/**
* Helper methods
**/
function initGapi() {
    return gapi.client.init({
        apiKey: config.apiKey,
        discoveryDocs: [config.discoveryUrl],
        // clientId and scope are optional if auth is not required.
        clientId: config.clientId,
        scope: config.scope
    });
    //.then(() => {});
}

const wrapWithSignIn = (method, params) => {
    return gapi.auth2.getAuthInstance().isSignedIn.get()
        ? method(params)
        : gapi.auth2.getAuthInstance().signIn().then(() => method(params));
};

const get = params => initGapi().then(() =>
    wrapWithSignIn(
        gapi.client.sheets.spreadsheets.values.get,
        params
    )
);

const batchGet = params => initGapi().then(() =>
    wrapWithSignIn(
        gapi.client.sheets.spreadsheets.values.batchGet,
        params
    )
);

function toListOfMaps(rows, tabName) {
    if (!rows) {
        throw new Error(`Provided '${tabName}' tab rows list is empty`);
    }

    const {
        result: {
            valueRanges: [
                { values: [rawHeader] },
                { values: rawData }
            ]
        }
    } = rows;

    const header = fromJS(rawHeader);
    const data = fromJS(rawData);

    return data.map(entry =>
        header.reduce((result, item, idx) =>
            result.set(camelCase(item), entry.get(idx, '')),
            new Map()
        )
    );
}

/**
* API methods
**/
export function getStudents() {
    return new Promise((resolve, reject) => {
        const callApi = () => {
            batchGet({
                spreadsheetId: config.spreadsheetId,
                majorDimension: 'ROWS',
                ranges: [
                    `${tabs.students}!${HEADER_RANGE}`,
                    `${tabs.students}!${DATA_RANGE}`],
            }).then(
                // Process correct response
                response => {
                    try {
                        resolve(toListOfMaps(response, tabs.students));
                    } catch(error) {
                        reject(error);
                    }
                },
                // Process error response
                response => reject(response.result.error.message)
            );
        };

        gapi.load('client:auth2', callApi);
    });
}

export function getStudent(id, idName) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject(`Please provide your ${idName}`);
        }

        getStudents()
            .then(result => {
                const user = result.find(student =>
                    student.get(idName).trim() === id.trim()
                );

                if (user) {
                    resolve(user);
                } else {
                    reject(`User with ${idName} "${id}" not found`);
                }
            })
            .catch(error => reject(error));
    });
}

export const getStudentByKey = key => getStudent(key, 'key');

export function getReviews() {
    return new Promise((resolve, reject) => {
        const callApi = () => {
            batchGet({
                spreadsheetId: config.spreadsheetId,
                majorDimension: 'ROWS',
                ranges: [
                    `${tabs.reviews}!${HEADER_RANGE}`,
                    `${tabs.reviews}!${DATA_RANGE}`],
            }).then(
                // Process correct response
                response => {
                    try {
                        resolve(toListOfMaps(response, tabs.reviews));
                    } catch(error) {
                        reject(error);
                    }
                },
                // Process error response
                response => reject(response.result.error.message)
            );
        };

        gapi.load('client:auth2', callApi);
    });
}
