import { fromJS } from 'immutable';

import user from './user';

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
            user(state, action);

            const key = action.userData.get('key');
            return state
                .set('key', key)
                .set('loggedIn', true)
                .set('loggingIn', false)
                .set('error', null);
        }

        case USER_LOGIN_FAILURE: {
            user(state, action);

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
