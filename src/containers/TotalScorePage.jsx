import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchReviews } from '../actions';
import {
    isReviewsFetching,
    getStudentTotalScore,
    getStudentRating
} from '../selectors/reviews';
import { getUserName, getUserLogin } from '../selectors/user';

import Loader from '../components/Loader.jsx';
import TotalScore from '../components/TotalScore.jsx';

const SHOW_CONGRATS_RATING_UPPER_BOUND = 10;

@connect(mapStateToProps, { fetchReviews })
export default class TotalScorePage extends Component {
    static propTypes = {
        fetchReviews: PropTypes.func.isRequired,
        isReviewsFetching: PropTypes.bool.isRequired,
        totalScore: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        userRating: PropTypes.shape({
            competitorsCount: PropTypes.number.isRequired,
            value: PropTypes.number.isRequired
        }).isRequired,
    };

    componentWillMount() {
        this.props.fetchReviews();
    }

    render () {
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
    const login = getUserLogin(state);

    return {
        isReviewsFetching: isReviewsFetching(state),
        totalScore: getStudentTotalScore(state, login),
        userName: getUserName(state),
        userRating: getStudentRating(state, login)
    };
}
