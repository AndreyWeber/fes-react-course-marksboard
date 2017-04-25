import { createSelector } from 'reselect';

import { getUserLogin } from './user';

/**
* Helper methods
**/
const marksSum = reviews => (reviews
        .reduce((score, item) =>
            score + parseFloat(item.get('mark', 0)),
            0
        )
);

/**
 * Private selectors
 */
const getReviews = state => state.get('reviews');

const getReviewItems = createSelector(
    getReviews,
    reviews => reviews.get('items')
);

const getStudentRatingsTable = state => (
    getReviewItems(state)
        .groupBy(review => review.get('student'))
        .map(reviews => marksSum(reviews))
        .sortBy(mark => mark)
        .reverse()
);

/**
* Public selectors
**/
export const isReviewsFetching = createSelector(
    getReviews,
    reviews => reviews.get('isFetching')
);

export const getStudentTotalScore = createSelector(
    getUserLogin,
    getStudentRatingsTable,
    (login, ratingsTable) => ratingsTable.get(login, 0)
);

export const getStudentRating = createSelector(
    getUserLogin,
    getStudentRatingsTable,
    (login, ratingsTable) => {
        const indexInRatingsTable = ratingsTable.keySeq().keyOf(login);

        return {
            competitorsCount:   ratingsTable.count(),
            value:              (indexInRatingsTable + 1) || 0
        };
    }
);
