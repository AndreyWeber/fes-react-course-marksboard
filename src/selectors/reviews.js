import { createSelector } from 'reselect';

export const getReviews = state => state.get('reviews');

export const getEntities = createSelector(
    getReviews,
    reviews => reviews.get('entities')
);

export const isFetching = createSelector(
    getReviews,
    reviews => reviews.get('isFetching')
);
