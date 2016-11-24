import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { userLogin } from '../actions';
import { getLoggingIn } from '../selectors/login';

import Login from '../components/Login.jsx';

@connect(mapStateToProps, { replace, userLogin })
export default class LoginPage extends Component {
    static propTypes = {
        loggingIn: PropTypes.bool.isRequired,
        replace: PropTypes.func.isRequired,
        userLogin: PropTypes.func.isRequired
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.loggingIn) {
            return;
        }

        // TODO: Add error handling
        // TODO: Add router state handling

        this.props.replace({
            pathname: '/totalscore'
        });
    }

    handleClick = key => this.props.userLogin(key);

    render() {
        return (
            <Login onClick={this.handleClick} />
        );
    }
}

function mapStateToProps(state) {
    return {
        loggingIn: getLoggingIn(state)
    };
}
