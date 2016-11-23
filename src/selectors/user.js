import { createSelector } from 'reselect';

export const getUser = state => state.get('user');

export const getDisplayName = createSelector(
    getUser,
    user => user.get('name', 'Anonymous')
);

export const getIsFetching = createSelector(
    getUser,
    user => user.get('isFetching')
);

export const getTotalScore = createSelector(
    getUser,
    user => user.get('totalScore')
);
