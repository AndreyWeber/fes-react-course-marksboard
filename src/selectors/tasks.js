import { createSelector } from 'reselect';

/**
 * Helper methods
 **/
const getTasks = state => state.get('tasks');

/**
 * Public methods
 **/
export const isTasksFetching = createSelector(
    getTasks,
    tasks => tasks.get('isFetching')
);
