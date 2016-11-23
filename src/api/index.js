import { fromJS, Map } from 'immutable';
import camelCase from 'camel-case';

import config from './api.config.js';

/**
* Constants
**/
const REVIEWS_TAB = 'Reviews';
const DIVISION_TAB = 'Division';
const POINTS_TAB = 'Points';
const STUDENTS_TAB = 'Students';
const MENTORS_TAB = 'Mentors';
const LESSONS_TAB = 'Lessons';
const TASKS_TAB = 'Tasks';

/**
* Helper methods
**/
function initGapi() {
    return gapi.client.init({
        'apiKey': config.apiKey,
        // clientId and scope are optional if auth is not required.
        //'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
        //'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly'
    })
    .then(() => gapi.client.load(config.discoveryUrl));
}

const get = params => initGapi().then(() =>
    gapi.client.sheets.spreadsheets.values.get(params));

const batchGet = params => initGapi().then(() =>
    gapi.client.sheets.spreadsheets.values.batchGet(params));

function toListOfMaps(rows) {
    if (!rows) {
        throw new Error('Provided tab rows list is empty');
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
                ranges: [`${STUDENTS_TAB}!1:1`, `${STUDENTS_TAB}!2:1000`],
            }).then(
                // Process correct response
                response => {
                    try {
                        resolve(toListOfMaps(response));
                    } catch(error) {
                        reject(error);
                    }
                },
                // Process error response
                response => reject(response.result.error.message)
            );
        };

        gapi.load('client', callApi);
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
                    reject(`User with "${id}" ${idName} not found`);
                }
            })
            .catch(error => reject(error));
    });
}

export function getReviews() {
    return new Promise((resolve, reject) => {
        const callApi = () => {
            batchGet({
                spreadsheetId: config.spreadsheetId,
                majorDimension: 'ROWS',
                ranges: [`${REVIEWS_TAB}!1:1`, `${REVIEWS_TAB}!2:1000`],
            }).then(
                // Process correct response
                response => {
                    try {
                        resolve(toListOfMaps(response));
                    } catch(error) {
                        reject(error);
                    }
                },
                // Process error response
                response => reject(response.result.error.message)
            );
        };

        gapi.load('client', callApi);
    });
}

export function getStudentTotalScore(login) {
    return new Promise((resolve, reject) => {
        if (!login) {
            reject("Empty login value provided. Can't count student total score.");
        }

        getReviews()
            .then(result => resolve(
                result
                    .filter(review =>
                        review.get('student').trim() === login.trim()
                    )
                    .reduce((score, item) =>
                        score + parseFloat(item.get('points', 0)),
                        0
                    )
                )
            )
            .catch(error => reject(error));
    });
}
