import { fromJS, Map } from 'immutable';
import camelCase from 'camel-case';

import config from './api.config.js';

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

/**
* API methods
**/
export function getStudents() {
    return new Promise((resolve, reject) => {
        const callApi = () => {
            batchGet({
                spreadsheetId: config.spreadsheetId,
                majorDimension: 'ROWS',
                ranges: ['Students!1:1', 'Students!2:1000'],
            }).then(
                // Process correct response
                response => {
                    const {
                        result: {
                            valueRanges: [
                                { values: [rawHeader] },
                                { values: rawData }
                            ]
                        }
                    } = response;

                    const header = fromJS(rawHeader);
                    const data = fromJS(rawData);

                    const students = data.map(student =>
                        header.reduce((result, item, idx) =>
                                result.set(camelCase(item), student.get(idx, '')),
                            new Map()
                        )
                    );

                    resolve(students);
                },
                // Process error response
                response => reject(response.result.error.message)
            );
        };

        gapi.load('client', callApi);
    });
}

export function getStudentByLogin(login) {
    return new Promise((resolve, reject) => {
        if (!login) {
            reject('Please provide your login');
        }

        getStudents().then(
            result => {
                const user = result.find(student =>
                    student.get('login').trim() === login.trim()
                );

                if (user) {
                    resolve(user);
                } else {
                    reject(`User with "${login}" login not found`);
                }
            },
            error => reject(error)
        );
    });
}
