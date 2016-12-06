import { createSelector } from 'reselect';

export const getUser = state => state.get('user');

export const getUserName = createSelector(
    getUser,
    user => user.get('name')
);

export const getUserLogin = createSelector(
    getUser,
    user => user.get('login')
);
