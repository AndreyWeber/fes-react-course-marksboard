import { fromJS } from 'immutable';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE
} from '../actions';

const userInitialState = fromJS({
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

        default: {
            return state;
        }
    }
}
