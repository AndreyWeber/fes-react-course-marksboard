import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { userLogin } from '../actions';
import {
    getError,
    isLoggedIn,
    isLoggingIn
} from '../selectors/login';
import { getLocationState } from '../selectors/routing';

import Login from '../components/Login.jsx';
import Loader from '../components/Loader.jsx';

const AFTER_LOGIN_PATH = '/totalscore';

@connect(mapStateToProps, { replace, userLogin })
export default class LoginPage extends Component {
    static propTypes = {
        error: PropTypes.string,
        isLoggedIn: PropTypes.bool.isRequired,
        isLoggingIn: PropTypes.bool.isRequired,
        locationState: PropTypes.shape({
            nextPathname: PropTypes.string,
            nextQuery: PropTypes.object
        }),
        replace: PropTypes.func.isRequired,
        userLogin: PropTypes.func.isRequired
    };

    componentWillMount() {
        const {
            isLoggedIn,
            locationState
        } = this.props;

        if (!isLoggedIn) {
            return;
        }

        this.setLocation(locationState);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoggedIn) {
            return;
        }

        this.setLocation(nextProps.locationState);
    }

    setLocation(locationState) {
        if (locationState) {
            this.props.replace({
                pathname: locationState.nextPathname,
                query: locationState.nextQuery
            });
        } else {
            this.props.replace({
                pathname: AFTER_LOGIN_PATH
            });
        }
    }

    render() {
        const {
            error,
            isLoggingIn,
            userLogin
        } = this.props;

        return (
            <Loader loading={isLoggingIn}>
                <Login
                    error={error}
                    onLogin={userLogin}
                />
            </Loader>
        );
    }
}

function mapStateToProps(state) {
    const locationState = getLocationState(state);

    return {
        error: getError(state),
        isLoggedIn: isLoggedIn(state),
        isLoggingIn: isLoggingIn(state),
        locationState: locationState && locationState.toJS()
    };
}
