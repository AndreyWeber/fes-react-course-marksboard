/* eslint-disable no-undef, no-unused-vars */
import { fromJS, Map } from 'immutable';
import camelCase from 'camel-case';

import config from './api.config.js';

/**
* Constants
**/
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

function getSpreadsheetTabData(tabName) {
    return new Promise((resolve, reject) => {
        const callApi = () => {
            batchGet({
                spreadsheetId: config.spreadsheetId,
                majorDimension: 'ROWS',
                ranges: [
                    `${tabName}!${HEADER_RANGE}`,
                    `${tabName}!${DATA_RANGE}`]
            }).then(
                // Process correct response
                response => {
                    try {
                        resolve(toListOfMaps(response, tabName));
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

/**************
 * API methods
 **************/

/**
 * Students
 **/
export const getStudents = () => getSpreadsheetTabData(tabs.students);

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

/**
 * Reviews
 **/
export const getReviews = () => getSpreadsheetTabData(tabs.reviews);

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
export const getLessons = studentLogin => {
    return new Promise((resolve, reject) => {
        if (!studentLogin) {
            reject('To get lessons for the student please provide student login');
        }

        const lcStudentLogin = studentLogin.toLowerCase();

        Promise.all([
            getSpreadsheetTabData(tabs.lessons),
            getSpreadsheetTabData(tabs.division),
            getSpreadsheetTabData(tabs.mentors),
            getSpreadsheetTabData(tabs.tasks),
            getReviews()
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

                        return lesson
                            .set('number', lessonNumber)
                            .set(
                                'mentorGithubLogin',
                                mentors
                                    .find(mentor =>
                                        mentor.get('login').toLowerCase() ===
                                        studentDivision.get(`${lessonNumber}`).toLowerCase()
                                    )
                                    .get('github')
                            )
                            .set(
                                'tasks',
                                tasks
                                    .filter(task =>
                                        Math.floor(task.get('number') / 10) === lessonNumber
                                    )
                                    .map(task =>
                                        task.set(
                                            'review',
                                            reviews
                                                .find(review =>
                                                    review.get('homeworkNumber') === task.get('number')
                                                )
                                        )
                                    )
                            );
                    });

                resolve(result);
            },
            error => reject(error)
        ).catch(
            error => reject(error)
        );
    });
}
