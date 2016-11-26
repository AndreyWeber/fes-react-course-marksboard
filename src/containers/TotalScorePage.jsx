import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getReviews } from '../selectors/reviews';
import { getUser } from '../selectors/user';

import TotalScore from '../components/TotalScore.jsx';
import Loader from '../components/Loader.jsx';

@connect(mapStateToProps, undefined)
export default class TotalScorePage extends Component {
    static propTypes = {
        reviews: PropTypes.shape({
            filter: PropTypes.func
        }).isRequired,
        user: PropTypes.shape({
            isFetching: PropTypes.bool.isRequired,
            login: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    };

    getTotalScore() {
        const {
            reviews,
            user: { login }
        } = this.props;

        return reviews
            .filter(review =>
                review.get('student').trim() === login.trim()
            )
            .reduce((score, item) =>
                score + parseFloat(item.get('points', 0)),
                0
            );
    }

    render () {
        const {
            name,
            isFetching
        } = this.props.user;

        return (
            <Loader loading={isFetching}>
                <TotalScore
                    name={name}
                    totalScore={this.getTotalScore()}
                />
            </Loader>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: getUser(state).toJS(),
        reviews: getReviews(state)
    };
}
