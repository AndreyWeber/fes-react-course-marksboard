import { createSelector } from 'reselect';

export const getLogin = state => state.get('login');

export const getLoggedIn = createSelector(
    getLogin,
    login => login.get('loggedIn')
);

export const getLoggingIn = createSelector(
    getLogin,
    login => login.get('loggingIn')
);
