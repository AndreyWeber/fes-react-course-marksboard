import { fromJS, List } from 'immutable';

import {
    FETCH_LESSONS_REQUEST,
    FETCH_LESSONS_SUCCESS,
    FETCH_LESSONS_FAILURE
} from '../actions';

const lessonsInitialState = fromJS({
    items: [],
    isFetching: false,
    error: null
});

export default function lessons(state = lessonsInitialState, action) {
    switch (action.type) {
        case FETCH_LESSONS_REQUEST: {
            return state
                .set('items', new List())
                .set('isFetching', true)
                .set('error', null);
        }

        case FETCH_LESSONS_SUCCESS: {
            return state
                .set('items', action.lessons)
                .set('isFetching', false)
                .set('error', null);
        }

        case FETCH_LESSONS_FAILURE: {
            return state
                .set('items', new List())
                .set('isFetching', false)
                .set('error', action.error);
        }

        default: {
            return state;
        }
    }
}
