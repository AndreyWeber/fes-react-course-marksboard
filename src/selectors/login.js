import { createSelector } from 'reselect';

export const getLogin = state => state.get('login');

export const isLoggedIn = createSelector(
    getLogin,
    login => login.get('loggedIn')
);

export const isLoggingIn = createSelector(
    getLogin,
    login => login.get('loggingIn')
);
