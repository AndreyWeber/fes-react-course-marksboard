import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchReviews } from '../actions';
import { getEntities, isFetching } from '../selectors/reviews';
import { getUser } from '../selectors/login';

import Loader from '../components/Loader.jsx';
import TotalScore from '../components/TotalScore.jsx';

@connect(mapStateToProps, { fetchReviews })
export default class TotalScorePage extends Component {
    static propTypes = {
        fetchReviews: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        reviews: PropTypes.shape({
            filter: PropTypes.func
        }).isRequired,
        user: PropTypes.shape({
            login: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    };

    componentWillMount() {
        this.props.fetchReviews();
    }

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
                score + parseFloat(item.get('mark', 0)),
                0
            );
    }

    render () {
        const {
            user: { name },
            isFetching
        } = this.props;

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
        isFetching: isFetching(state),
        reviews: getEntities(state)
    };
}
