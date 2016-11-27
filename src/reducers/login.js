import { fromJS, Map } from 'immutable';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE
} from '../actions';

const loginInitialState = fromJS({
    user: {},
    loggedIn: false,
    loggingIn: false,
    error: null
});

export default function login(state = loginInitialState, action) {
    switch (action.type) {
        case USER_LOGIN_REQUEST: {
            return state
                .merge(loginInitialState)
                .set('loggingIn', true);
        }

        case USER_LOGIN_SUCCESS: {
            return state
                .set('user', action.user)
                .set('loggedIn', true)
                .set('loggingIn', false)
                .set('error', null);
        }

        case USER_LOGIN_FAILURE: {
            return state
                .setIn(['user', 'key'], action.key)
                .set('loggedIn', false)
                .set('loggingIn', false)
                .set('error', action.error);
        }

        default: {
            return state;
        }
    }
}
