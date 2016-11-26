import {
    getReviews,
    getStudent,
} from '../api';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE';

export const userLogin = key => dispatch => {
    dispatch({
        type: USER_LOGIN_REQUEST
    });

    // TODO: Add local storage save/load functionality

    getStudent(key, 'key')
        .then(userData => dispatch({
            type: USER_LOGIN_SUCCESS,
            userData
        }))
        .catch(error => dispatch({
            type: USER_LOGIN_FAILURE,
            key,
            error
        }));
};

export const fetchReviews = () => dispatch => {
    dispatch({
        type: FETCH_REVIEWS_REQUEST
    });

    getReviews()
        .then(reviews => dispatch({
            type: FETCH_REVIEWS_SUCCESS,
            reviews
        }))
        .catch(error => dispatch({
            type: FETCH_REVIEWS_FAILURE,
            error
        }));
};
