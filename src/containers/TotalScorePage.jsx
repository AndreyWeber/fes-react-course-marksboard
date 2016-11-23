import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { totalScore } from '../actions';
import { getUser } from '../selectors/user';

import TotalScore from '../components/TotalScore.jsx';
import Loader from '../components/Loader.jsx';

@connect(mapStateToProps, { totalScore })
export default class TotalScorePage extends Component {
    static propTypes = {
        totalScore: PropTypes.func.isRequired,
        user: PropTypes.shape({
            isFetching: PropTypes.bool.isRequired,
            login: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            totalScore: PropTypes.number.isRequired
        })
    };

    componentWillMount() {
        this.props.totalScore(this.props.user.login);
    }

    render () {
        const {
            name,
            isFetching,
            totalScore
        } = this.props.user;

        return (
            <Loader loading={isFetching}>
                <TotalScore
                    name={name}
                    totalScore={totalScore}
                />
            </Loader>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: getUser(state).toJS()
    };
}
