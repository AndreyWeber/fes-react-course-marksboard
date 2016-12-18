import { createSelector } from 'reselect';

/**
 * Helper methods
 **/
const getLessons = state => state.get('lessons');

/**
 * Public methods
 **/
export const isLessonsFetching = createSelector(
    getLessons,
    lessons => lessons.get('isFetching')
);
