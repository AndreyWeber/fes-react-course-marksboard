import { createSelector } from 'reselect';
import { Map } from 'immutable';

/**
 * Private selectors
 **/
const getLessons = state => state.get('lessons');

/**
 * Public selectors
 **/
export const getLessonItems = createSelector(
    getLessons,
    lessons => lessons
        .get('items')
        .map(lesson => {
            const tasks = lesson.get('tasks');

            return Map({
                topic: lesson.get('topic').trim(),
                number: lesson.get('number'),
                mentorGithubLogin: lesson.get('mentorGithubLogin'),
                mentorName: lesson.get('mentorName'),
                score: tasks.reduce((score, currentTask) =>
                    score + parseInt(currentTask.getIn(['review', 'mark'], 0)),
                    0
                ),
                maxScore: tasks.reduce((score, currTask) =>
                    score + parseInt(currTask.get('points')),
                    0
                ),
                tasks: tasks.map(task => Map({
                    name: task.get('name'),
                    number: task.get('number'),
                    timestamp: task.getIn(['review', 'timestamp'], null),
                    score: parseInt(task.getIn(['review', 'mark'], 0)),
                    maxScore: parseInt(task.get('points', 0)),
                    prUrl: task.getIn(['review', 'prUrl'], null)
                }))
            });
        })
);

export const isLessonsFetching = createSelector(
    getLessons,
    lessons => lessons.get('isFetching')
);
