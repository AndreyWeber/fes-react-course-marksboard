import { createSelector } from 'reselect';

export const getCurrentUser = state => {
    return state.get('user');
};

export const isCurrentUserLoggedIn = createSelector(
    getCurrentUser,
    user => user.get('loggedIn')
);
