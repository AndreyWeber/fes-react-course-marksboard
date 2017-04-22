import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchReviews } from '../actions';
import { getCurrentSpreadsheetName } from '../utils/session';
import { isReviewsFetching, getStudentTotalScore, getStudentRating } from '../selectors/reviews';
import { getUserName } from '../selectors/user';
import { getSpreadsheetNameFromQuery } from '../selectors/routing';

import Loader from '../components/Loader.jsx';
import TotalScore from '../components/TotalScore.jsx';
import NavigationBar from '../components/NavigationBar.jsx';

const SHOW_CONGRATS_RATING_UPPER_BOUND = 10;

@connect(mapStateToProps, { fetchReviews })
export default class TotalScorePage extends Component {
    static propTypes = {
        fetchReviews: PropTypes.func.isRequired,
        isReviewsFetching: PropTypes.bool.isRequired,
        spreadsheetName: PropTypes.string,
        totalScore: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        userRating: PropTypes.shape({
            competitorsCount: PropTypes.number.isRequired,
            value: PropTypes.number.isRequired
        }).isRequired,
    };

    componentWillMount() {
        const {
            fetchReviews,
            spreadsheetName
        } = this.props;

        fetchReviews(spreadsheetName);
    }

    render() {
        const {
            isReviewsFetching,
            userRating: {
                competitorsCount,
                value: ratingValue
            },
            totalScore,
            userName
        } = this.props;

        return (
            <Loader loading={isReviewsFetching}>
                <NavigationBar />
                <TotalScore
                    competitorsCount={competitorsCount}
                    ratingValue={ratingValue}
                    showCongrats={ratingValue <= SHOW_CONGRATS_RATING_UPPER_BOUND}
                    totalScore={totalScore}
                    userName={userName}
                />
            </Loader>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReviewsFetching: isReviewsFetching(state),
        spreadsheetName: getCurrentSpreadsheetName() || getSpreadsheetNameFromQuery(state),
        totalScore: getStudentTotalScore(state),
        userName: getUserName(state),
        userRating: getStudentRating(state)
    };
}
