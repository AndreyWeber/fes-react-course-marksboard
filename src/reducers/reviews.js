import { fromJS, List } from 'immutable';

import {
    FETCH_REVIEWS_REQUEST,
    FETCH_REVIEWS_SUCCESS,
    FETCH_REVIEWS_FAILURE
} from '../actions';

const reviewsInitialState = fromJS({
    items: [],
    isFetching: false,
    error: null
});

export default function reviews(state = reviewsInitialState, action) {
    switch (action.type) {
        case FETCH_REVIEWS_REQUEST: {
            return state
                .set('items', new List())
                .set('isFetching', true)
                .set('error', null);
        }

        case FETCH_REVIEWS_SUCCESS: {
            return state
                .set('items', action.reviews)
                .set('isFetching', false)
                .set('error', null);
        }

        case FETCH_REVIEWS_FAILURE: {
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
