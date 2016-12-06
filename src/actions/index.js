import { setCurrentUserKey } from '../utils/session';
import {
    getReviews,
    getStudentByKey,
} from '../api';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE';

export const userLogin = (key, loginCallback = undefined) => dispatch => {
    dispatch({
        type: USER_LOGIN_REQUEST
    });

    const call = callback => {
        if (callback && typeof callback === typeof Function) {
            callback();
        }
    };
    getStudentByKey(key)
        .then(user => {
            setCurrentUserKey(user.get('key'));

            dispatch({
                type: USER_LOGIN_SUCCESS,
                user
            });

            call(loginCallback);
        })
        .catch(error => {
            dispatch({
                type: USER_LOGIN_FAILURE,
                key,
                error
            });

            call(loginCallback);
        });
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
