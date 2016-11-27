import { fromJS } from 'immutable';

import {
    FETCH_REVIEWS_REQUEST,
    FETCH_REVIEWS_SUCCESS,
    FETCH_REVIEWS_FAILURE
} from '../actions';

const reviewsInitialState = fromJS({
    entities: [],
    isFetching: false,
    error: null
});

export default function reviews(state = reviewsInitialState, action) {
    switch (action.type) {
        case FETCH_REVIEWS_REQUEST: {
            return state
                .merge(reviewsInitialState)
                .set('isFetching', true);
        }

        case FETCH_REVIEWS_SUCCESS: {
            return state
                .merge(reviewsInitialState)
                .set('entities', action.reviews);
        }

        case FETCH_REVIEWS_FAILURE: {
            return state
                .merge(reviewsInitialState)
                .set('error', action.error);
        }

        default: {
            return state;
        }
    }
}
