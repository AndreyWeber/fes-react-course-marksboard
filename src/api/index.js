/* eslint-disable no-undef, no-unused-vars */
import { fromJS, Map } from 'immutable';
import camelCase from 'camel-case';

import config from './api.config.js';

/************
 * Constants
 ************/
const tabs = {
    reviews:    'Reviews',
    division:   'Division',
    points:     'Points',
    students:   'Students',
    mentors:    'Mentors',
    lessons:    'Lessons',
    tasks:      'Tasks'
};

const lessonTypes = {
    lesson:     'lesson',
    practice:   'practice',
    qa:         'qa'
};

const RANGE_UPPER_BOUNDARY = '2000';
const HEADER_RANGE = '1:1';
const DATA_RANGE = `2:${RANGE_UPPER_BOUNDARY}`;

// TODO: Re-factor: convert funtions to lambda expressions ?
// TODO: Re-factor: refine error messages, which can be shown on UI

/*****************
 * Helper methods
 *****************/
const getSpreadsheetIdByName = name => {
    if (!name || name === '') {
        throw new Error('Please provide Google spreadsheet name URL parameter');
    }

    const spreadsheet = config.availableSpreadsheets
        .find(ss => ss.name.toLowerCase() === name.toLowerCase());
    if (spreadsheet) {
        return spreadsheet.id;
    }

    throw new Error(`No Google spreadsheet named ${name} found`);
};

function initGapi() {
    const {
        apiKey,
        discoveryUrl,
        clientId,
        scope
    } = config.commonCredentials;

    return gapi.client.init({
        apiKey: apiKey,
        discoveryDocs: [discoveryUrl],
        // clientId and scope are optional if auth is not required.
        clientId: clientId,
        scope: scope
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
        throw new Error(`Provided rows list for tab '${tabName}' is empty`);
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

function getSpreadsheetTabData(spreadsheetName, tabName) {
    return new Promise((resolve, reject) => {
        if (!tabName || tabName === '') {
            reject(new Error('Spreadsheet tab name is undefined or empty'));
        }

        // Error synchronously created by calling functions will be
        // treated as reject() call
        const spreadsheetId = getSpreadsheetIdByName(spreadsheetName);

        const callApi = () => {
            batchGet({
                spreadsheetId: spreadsheetId,
                majorDimension: 'ROWS',
                ranges: [
                    `${tabName}!${HEADER_RANGE}`,
                    `${tabName}!${DATA_RANGE}`]
            }).then(
                // Process correct response
                response => {
                    try {
                        resolve(toListOfMaps(response, tabName));
                    } catch (error) {
                        reject(error);
                    }
                },
                // Process error response
                response => reject(response.result.error)
            );
        };

        gapi.load('client:auth2', callApi);
    });
}

/**************
 * API methods
 **************/

/**
 * Students
 **/

/**
 * Get list of students from Google spreadsheet 'Students' tab
 * @param {String} spreadsheetName - Name of Google spreadsheet to fetch data from
 */
export const getStudents = spreadsheetName =>
    getSpreadsheetTabData(spreadsheetName, tabs.students);

/**
 * Get a Student from Google spreadsheet 'Students' tab by any of
 * student's ids (Key, Login, etc)
 * @param {String} spreadsheetName - Name of Google spreadsheet to fetch data from
 * @param {String} id - Student id value
 * @param {String} idName - Student id name
 * @returns {Promise}
 */
export function getStudent(spreadsheetName, id, idName) {
    return new Promise((resolve, reject) => {
        if (!idName) {
            reject(new Error('Please provide your Id name'));
        }

        if (!id) {
            reject(new Error(`Please provide your ${idName} value`));
        }

        getStudents(spreadsheetName)
            .then(result => {
                const user = result.find(student =>
                    student.get(idName).trim() === id.trim()
                );

                if (user) {
                    resolve(user);
                } else {
                    reject(new Error(`User with ${idName} "${id}" not found in the spreadsheet "${spreadsheetName}"`));
                }
            })
            .catch(
                error => reject(error)
            );
    });
}

/**
 * Get Student from Google spreadsheet 'Students' tab by 'Key' id
 * @param {String} spreadsheetName - Name of Google spreadsheet to fetch data from
 * @param {String} key - student Key id value
 */
export const getStudentByKey = (spreadsheetName, key) =>
    getStudent(spreadsheetName, key, 'key');

/**
 * Reviews
 **/

/**
 * Get Reviews from Google spreadsheet 'Reviews' tab
 * @param {String} spreadsheetName - Name of Google spreadsheet to fetch data from
 */
export const getReviews = spreadsheetName =>
    getSpreadsheetTabData(spreadsheetName, tabs.reviews);

/**
 * Lessons & Tasks
 **/
/*
Lesson
|
|_<LessonOwnProps>
|
|_MentorGithubLogin
|
|_MentorName
|
|_LessonNumber
|
|_Task_0
|   |
|   |_<TaskOwnProps>
|   |
|   |_Review
|
|_Task_1
|
...
|
|_Task_N
*/
/**
 * Get data about Student home works progress from Google
 * spreadsheet 'Students' tab by student login
 * @param {String} spreadsheetName - Name of Google spreadsheet to fetch data from
 * @param {String} studentLogin - student login
 * @returns {Promise}
 */
export const getLessons = (spreadsheetName, studentLogin) => {
    return new Promise((resolve, reject) => {
        if (!studentLogin) {
            reject(new Error("Please provide student's login to get lessons for the student"));
        }

        const lcStudentLogin = studentLogin.toLowerCase();

        Promise.all([
            getSpreadsheetTabData(spreadsheetName, tabs.lessons),
            getSpreadsheetTabData(spreadsheetName, tabs.division),
            getSpreadsheetTabData(spreadsheetName, tabs.mentors),
            getSpreadsheetTabData(spreadsheetName, tabs.tasks),
            getReviews(spreadsheetName)
        ]).then(
            results => {
                const [
                    lessons,
                    divisions,
                    mentors,
                    tasks,
                    reviews
                ] = results;

                const studentDivision = divisions.find(division =>
                    division.get('student').toLowerCase() === lcStudentLogin
                );

                const result = lessons
                    .filter(lesson =>
                        lesson.get('type').toLowerCase() === lessonTypes.lesson
                    )
                    .map((lesson, idx) => {
                        const lessonNumber = idx + 1;

                        const mentor = mentors.find(mentor =>
                            mentor.get('login').toLowerCase() ===
                            studentDivision.get(`${lessonNumber}`).toLowerCase()
                        );

                        return lesson
                            .set('number', lessonNumber)
                            .set(
                                'mentorGithubLogin',
                                mentor
                                    .get('github')
                                    .trim()
                            )
                            .set(
                                'mentorName',
                                mentor
                                    .get('name')
                                    .trim()
                            )
                            .set(
                                'tasks',
                                tasks
                                    .filter(task =>
                                        // Calculate tasks which are belongs to the current lesson
                                        Math.floor(task.get('number') / 10) === lessonNumber
                                    )
                                    .map(task =>
                                        task.set(
                                            'review',
                                            reviews
                                                .find(review =>
                                                    review.get('homeworkNumber') === task.get('number') &&
                                                    review.get('student').trim().toLowerCase() === lcStudentLogin
                                                )
                                        )
                                    )
                            );
                    });

                resolve(result);
            }
        ).catch(
            error => reject(error)
        );
    });
};
