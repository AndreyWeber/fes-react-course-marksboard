import {
    getFromStorage,
    putInStorage
} from '../utils/localStorage';
import {
    getReviews,
    getStudent,
} from '../api';

import { USER_KEY_STORAGE_NODE_NAME } from '../utils/localStorage';

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

    putInStorage(null, USER_KEY_STORAGE_NODE_NAME);

    getStudent(key, 'key')
        .then(user => {
            putInStorage(user.get('key'),
                USER_KEY_STORAGE_NODE_NAME);

            dispatch({
                type: USER_LOGIN_SUCCESS,
                user
            });
        })
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
