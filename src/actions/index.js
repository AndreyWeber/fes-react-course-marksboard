import {
    getStudent,
    getStudentTotalScore
} from '../api';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const TOTAL_SCORE_REQUEST = 'TOTAL_SCORE_REQUEST';
export const TOTAL_SCORE_SUCCESS = 'TOTAL_SCORE_SUCCESS';
export const TOTAL_SCORE_FAILURE = 'TOTAL_SCORE_FAILURE';

export const userLoginRequest = () => ({
    type: USER_LOGIN_REQUEST
});

export const userLoginSuccess = userData => ({
    type: USER_LOGIN_SUCCESS,
    userData
});

export const userLoginFailure = (login, error) => ({
    type: USER_LOGIN_FAILURE,
    login,
    error
});

export const userLogin = login => dispatch => {
    dispatch(userLoginRequest());

    // TODO: Add local storage save/load functionality

    getStudent(login, 'login')
        .then(userData => dispatch(userLoginSuccess(userData)))
        .catch(error => dispatch(userLoginFailure(login, error)));
};

export const totalScoreRequest = () => ({
    type: TOTAL_SCORE_REQUEST
});

export const totalScoreSuccess = totalScore => ({
    type: TOTAL_SCORE_SUCCESS,
    totalScore
});

export const totalScoreFailure = error => ({
    type: TOTAL_SCORE_FAILURE,
    error
});

export const totalScore = login => dispatch => {
    dispatch(totalScoreRequest());

    getStudentTotalScore(login)
        .then(totalScore => dispatch(totalScoreSuccess(totalScore)))
        .catch(error => dispatch(totalScoreFailure(error)));
};
