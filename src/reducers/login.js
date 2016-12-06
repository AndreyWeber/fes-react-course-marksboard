import { fromJS } from 'immutable';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE
} from '../actions';

const loginInitialState = fromJS({
    loggedIn: false,
    loggingIn: false,
    error: null
});

export default function login(state = loginInitialState, action) {
    switch (action.type) {
        case USER_LOGIN_REQUEST: {
            return state
                .set('loggedIn', false)
                .set('loggingIn', true)
                .set('error', null);
        }

        case USER_LOGIN_SUCCESS: {
            return state
                .set('loggedIn', true)
                .set('loggingIn', false)
                .set('error', null);
        }

        case USER_LOGIN_FAILURE: {
            return state
                .set('loggedIn', false)
                .set('loggingIn', false)
                .set('error', action.error);
        }

        default: {
            return state;
        }
    }
}
