import { fromJS } from 'immutable';

import {
    FETCH_REVIEWS_REQUEST,
    FETCH_REVIEWS_SUCCESS,
    FETCH_REVIEWS_FAILURE
} from '../actions';

const reviewsInitialState = fromJS({
    entities: {},
    isFetching: false,
    error: null
});

export default function reviews(state = reviewsInitialState, action) {
    switch (action.type) {
        case FETCH_REVIEWS_REQUEST: {
            return state
                .merge({
                    entities: {},
                    isFetching: true,
                    error: null
                });
        }

        case FETCH_REVIEWS_SUCCESS: {
            console.log('FETCH_REVIEWS_SUCCESS');
            return state
                .merge({
                    entities: action.reviews,
                    isFetching: false,
                    error: null
                });
        }

        case FETCH_REVIEWS_FAILURE: {
            return state
                .merge({
                    entities: {},
                    isFetching: false,
                    error: action.error
                });
        }

        default: {
            return state;
        }
    }
}
