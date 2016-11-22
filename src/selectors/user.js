import { createSelector } from 'reselect';

export const getUser = state => {
    return state.get('user');
};

export const isUserLoggedIn = createSelector(
    getUser,
    user => user.get('loggedIn')
);

export const isUserLoggingIn = createSelector(
    getUser,
    user => user.get('loggingIn')
);
