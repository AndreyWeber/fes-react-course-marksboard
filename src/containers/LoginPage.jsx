import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { userLogin } from '../actions';
import { getLoginError, isLoggedIn, isLoggingIn } from '../selectors/login';
import { getLocationState, getQuery, getSpreadsheetNameFromQuery } from '../selectors/routing';

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
        query: ImmutablePropTypes.map.isRequired,
        replace: PropTypes.func.isRequired,
        spreadsheetName: PropTypes.string,
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
        const {
            query,
            replace
        } = this.props;

        if (locationState) {
            // This branch will be called if not logged-in user
            // will try to open some page other then login page
            replace({
                pathname: locationState.get('nextPathname'),
                query: locationState.get('nextQuery').toJS()
            });
        } else {
            replace({
                pathname: NEXT_PATHNAME_DEFAULT,
                query: query.toJS()
            });
        }
    }

    render() {
        const {
            loginError,
            isLoggingIn,
            spreadsheetName,
            userLogin
        } = this.props;

        return (
            <Loader loading={isLoggingIn}>
                <Login
                    error={loginError}
                    spreadsheetName={spreadsheetName}
                    onLogin={userLogin}
                />
            </Loader>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginError: getLoginError(state),
        isLoggedIn: isLoggedIn(state),
        isLoggingIn: isLoggingIn(state),
        locationState: getLocationState(state),
        query: getQuery(state),
        spreadsheetName: getSpreadsheetNameFromQuery(state)
    };
}
