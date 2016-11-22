import { fromJS } from 'immutable';

import { getStudent } from '../api';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const userLoginRequest = () => ({
    type: USER_LOGIN_REQUEST
});

export const userLoginSuccess = userData => ({
    type: USER_LOGIN_SUCCESS,
    userData
});

export const userLoginFailure = (login, error) => ({
    type: USER_LOGIN_FAILURE,
    userData: fromJS({ login }),
    error: error
});

export const userLogin = login => dispatch => {
    dispatch(userLoginRequest(login));

    getStudent(login)
        .then(userData => dispatch(userLoginSuccess(userData)))
        .catch(error => dispatch(userLoginFailure(login, error)));
};
