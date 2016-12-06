import { fromJS } from 'immutable';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE
} from '../actions';

const userInitialState = fromJS({
    key: '',
    login: '',
    name: '',
    github: '',
    facebook: '',
    email: '',
    city: '',
    error: null
});

export default function user(state = userInitialState, action) {
    switch (action.type) {
        case USER_LOGIN_REQUEST: {
            return userInitialState
                .set('error', null);
        }

        case USER_LOGIN_SUCCESS: {
            return action.user
                .set('error', null);
        }

        case USER_LOGIN_FAILURE: {
            return userInitialState
                .set('key', action.key)
                .set('error', action.error);
        }

        default: {
            return state;
        }
    }
}
