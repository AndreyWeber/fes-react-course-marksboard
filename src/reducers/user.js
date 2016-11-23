import { fromJS } from 'immutable';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    TOTAL_SCORE_REQUEST,
    TOTAL_SCORE_SUCCESS,
    TOTAL_SCORE_FAILURE
} from '../actions';

const userInitialState = fromJS({
    totalScore: 0,
    isFetching: false,
    error: null
});

export default function user(state = userInitialState, action) {
    switch (action.type) {
        case USER_LOGIN_REQUEST: {
            return state
                .set('isFetching', true)
                .set('error', null);
        }

        case USER_LOGIN_SUCCESS: {
            return state
                .mergeDeep(action.userData)
                .set('isFetching', false)
                .set('error', null);
        }

        case USER_LOGIN_FAILURE: {
            return userInitialState
                .set('login', action.login)
                .set('error', null);
        }

        case TOTAL_SCORE_REQUEST: {
            return state
                .set('isFetching', true)
                .set('error', null);
        }

        case TOTAL_SCORE_SUCCESS: {
            return state
                .set('isFetching', false)
                .set('totalScore', action.totalScore)
                .set('error', null);
        }

        case TOTAL_SCORE_FAILURE: {
            return state
                .set('isFetching', false)
                .set('totalScore', 0)
                .set('error', action.error);
        }

        default: {
            return state;
        }
    }
}
