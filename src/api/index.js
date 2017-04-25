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

/*****************
 * Helper methods
 *****************/
/**
 * Get Google spreadsheet Id by its name from configuration
 * @param {String} name - Google spreadsheet name
 * @returns {String}
 */
const getSpreadsheetIdByName = name => {
    if (!name || name === '') {
        throw new Error("Please provide Google spreadsheet name as 'ssname' URL parameter");
    }

    const spreadsheet = config.availableSpreadsheets
        .find(ss => ss.name.toLowerCase() === name.toLowerCase());
    if (spreadsheet) {
        return spreadsheet.id;
    }

    throw new Error(`Google spreadsheet named '${name}' not found`);
};

/**
 * Initialize and return instance of Google API object.
 * Scope is restricted by Google Spreadsheet API
 * @returns {Object}
 */
const initGapi = () => {
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
};

/**
 * Wrap call to Google API with sign in method call
 * @param {Function} method - callback which should be wrapped with sign in call
 * @param {Object} params - arguments of the callback
 * @returns {void}
 */
const wrapWithSignIn = (method, params) => (
    gapi.auth2.getAuthInstance().isSignedIn.get()
        ? method(params)
        : gapi.auth2.getAuthInstance().signIn().then(() => method(params))
);

/**
 * Wrap Google Spreadsheet API get method with sign in call
 * @param {Object} params - arguments of the get method
 * @returns {Object}
 */
const get = params => initGapi().then(() =>
    wrapWithSignIn(
        gapi.client.sheets.spreadsheets.values.get,
        params
    )
);

/**
 * Wrap Google Spreadsheet API getBatch method with sign in call
 * @param {Object} params - arguments of the getBath method
 * @returns {Object}
 */
const batchGet = params => initGapi().then(() =>
    wrapWithSignIn(
        gapi.client.sheets.spreadsheets.values.batchGet,
        params
    )
);

/**
 * Converts list for Google spreadsheet tab rows to the immutable list of maps
 * @param {Object} rows - array of Google spreadsheet rows from
 * @param {String} tabName - name of the Google spreadsheet tab
 * @returns {ImmutableList}
 */
const toListOfMaps = (rows, tabName) => {
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
};

/**
 * Get immutable list of maps representing rows of particular
 * Google spreadsheet tab
 * @param {String} spreadsheetName - name of a Google spreadsheet to fetch data from
 * @param {String} tabName - name of a Google spreadsheet tab to fetch data from
 * @returns {Promise}
 */
const getSpreadsheetTabData = (spreadsheetName, tabName) => {
    return new Promise((resolve, reject) => {
        if (!tabName || tabName === '') {
            reject(new Error('Spreadsheet tab name is undefined or empty'));
        }

        // Error synchronously created by calling functions will be
        // treated as reject() call, getSpreadsheetIdByName call throw
        // an error
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
};

/*********************
 * API public methods
 *********************/

/**
 * Students
 **/

/**
 * Get list of students from Google spreadsheet 'Students' tab
 * @param {String} spreadsheetName - Name of Google spreadsheet to fetch data from
 * @returns {Object}
 */
export const getStudents = spreadsheetName =>
    getSpreadsheetTabData(spreadsheetName, tabs.students);

/**
 * Get a Student from Google spreadsheet 'Students' tab by any of
 * that student Ids (Key, Login, etc.)
 * @param {String} spreadsheetName - Name of Google spreadsheet to fetch data from
 * @param {String} idName - Student Id name
 * @param {String} idVal - Student Id value
 * @returns {Promise}
 */
export const getStudent = (spreadsheetName, idName, idVal) => {
    return new Promise((resolve, reject) => {
        if (!idName) {
            reject(new Error('Please provide your Id name'));
        }

        if (!idVal) {
            reject(new Error(`Please provide your '${idName}'`));
        }

        getStudents(spreadsheetName)
            .then(result => {
                const student = result.find(s =>
                    s.get(idName).trim() === idVal.trim()
                );

                if (student) {
                    resolve(student);
                } else {
                    reject(new Error(`Student with provided ${idName} wasn't found on the '${spreadsheetName}' spreadsheet`));
                }
            })
            .catch(
                error => reject(error)
            );
    });
};

/**
 * Get Student from Google spreadsheet 'Students' tab by 'Key' id
 * @param {String} spreadsheetName - Name of Google spreadsheet to fetch data from
 * @param {String} key - student Key id value
 */
export const getStudentByKey = (spreadsheetName, key) =>
    getStudent(spreadsheetName, 'key', key);

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
            reject(new Error("Student's login wasn't provided, can't get lessons for the student"));
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
