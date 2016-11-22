import { fromJS } from 'immutable';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE
} from '../actions';

const userInitialState = fromJS({
    userData: {},
    loggedIn: false,
    isFetching: false,
    error: null
});

export default function user(state = userInitialState, action) {
    switch (action.type) {
        case USER_LOGIN_REQUEST: {
            return state
                .set('isFetching', true);
        }

        case USER_LOGIN_SUCCESS: {
            return state
                .set('userData', action.userData)
                .set('loggedIn', true)
                .set('isFetching', false)
                .set('error', null);
        }

        case USER_LOGIN_FAILURE: {
            return state
                .set('userData', action.userData)
                .set('loggedIn', false)
                .set('isFetching', false)
                .set('error', action.error);
        }

        default: {
            return state;
        }
    }
}
