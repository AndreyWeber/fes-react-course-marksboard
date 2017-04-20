// TODO: Refactor selectors
// TODO: Add combine selectors
import { createSelector } from 'reselect';

/**
* Helper methods
**/
const getReviews = state => state.get('reviews');

const getReviewItems = createSelector(
    getReviews,
    reviews => reviews.get('items')
);

const marksSum = reviews => (reviews
        .reduce((score, item) =>
            score + parseFloat(item.get('mark', 0)),
            0
        )
);

const getStudentRatingsTable = state => (
    getReviewItems(state)
        .groupBy(review => review.get('student'))
        .map(reviews => marksSum(reviews))
        .sortBy(mark => mark)
        .reverse()
);

/**
* Public methods
**/
export const isReviewsFetching = createSelector(
    getReviews,
    reviews => reviews.get('isFetching')
);

export const getStudentTotalScore = (state, login) => (
    getStudentRatingsTable(state)
        .get(login, 0)
);

export const getStudentRating = (state, login) => {
    const ratingsTable = getStudentRatingsTable(state);
    const indexInRatingsTable = ratingsTable.keySeq().keyOf(login);

    return {
        competitorsCount:   ratingsTable.count(),
        value:              indexInRatingsTable + 1 || 0
    };
};
