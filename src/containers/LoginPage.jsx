import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { userLogin } from '../actions';
import { isLoggingIn } from '../selectors/login';

import Login from '../components/Login.jsx';

@connect(mapStateToProps, { replace, userLogin })
export default class LoginPage extends Component {
    static propTypes = {
        isLoggingIn: PropTypes.bool.isRequired,
        replace: PropTypes.func.isRequired,
        userLogin: PropTypes.func.isRequired
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggingIn) {
            return;
        }

        // TODO: Add error handling
        // TODO: Add router state handling

        this.props.replace({
            pathname: '/totalscore'
        });
    }

    render() {
        return (
            <Login onLogin={this.props.userLogin} />
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggingIn: isLoggingIn(state)
    };
}
