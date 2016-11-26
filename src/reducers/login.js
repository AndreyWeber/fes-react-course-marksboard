import { fromJS } from 'immutable';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE
} from '../actions';

const loginInitialState = fromJS({
    key: null,
    loggedIn: false,
    loggingIn: false,
    error: null
});

export default function login(state = loginInitialState, action) {
    switch (action.type) {
        case USER_LOGIN_REQUEST: {
            return state
                .set('loggingIn', true);
        }

        case USER_LOGIN_SUCCESS: {
            const key = action.userData.get('key');
            return state
                .set('key', key)
                .set('loggedIn', true)
                .set('loggingIn', false)
                .set('error', null);
        }

        case USER_LOGIN_FAILURE: {
            return state
                .set('key', action.key)
                .set('loggedIn', false)
                .set('loggingIn', false)
                .set('error', action.error);
        }

        default: {
            return state;
        }
    }
}
