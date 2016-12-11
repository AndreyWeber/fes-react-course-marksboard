import { fromJS, List } from 'immutable';

import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE
} from '../actions';

const tasksInitialState = fromJS({
    items: [],
    isFetching: false,
    error: null
});

export default function tasks(state = tasksInitialState, action) {
    switch (action.type) {
        case FETCH_TASKS_REQUEST: {
            return state
                .set('items', new List())
                .set('isFetching', true)
                .set('error', null);
        }

        case FETCH_TASKS_SUCCESS: {
            return state
                .set('items', action.tasks)
                .set('isFetching', false)
                .set('error', null);
        }

        case FETCH_TASKS_FAILURE: {
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
