import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { userLogin } from '../actions';
import {
    getLoginError,
    isLoggedIn,
    isLoggingIn
} from '../selectors/login';
import { getLocationState } from '../selectors/routing';

import Login from '../components/Login.jsx';
import Loader from '../components/Loader.jsx';

const NEXT_PATHNAME_DEFAULT = '/totalscore';

@connect(mapStateToProps, { replace, userLogin })
export default class LoginPage extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        isLoggingIn: PropTypes.bool.isRequired,
        locationState: PropTypes.shape({
            nextPathname: PropTypes.string,
            nextQuery: PropTypes.object
        }),
        loginError: PropTypes.string,
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
                pathname: locationState.get('nextPathname'),
                query: locationState.get('nextQuery').toJS()
            });
        } else {
            this.props.replace({
                pathname: NEXT_PATHNAME_DEFAULT
            });
        }
    }

    render() {
        const {
            loginError,
            isLoggingIn,
            userLogin
        } = this.props;

        return (
            <Loader loading={isLoggingIn}>
                <Login
                    error={loginError}
                    onLogin={userLogin}
                />
            </Loader>
        );
    }
}

function mapStateToProps(state) {
    const locationState = getLocationState(state);

    return {
        loginError: getLoginError(state),
        isLoggedIn: isLoggedIn(state),
        isLoggingIn: isLoggingIn(state),
        locationState: locationState
    };
}
