import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import PropTypes from 'prop-types';

import { isLoggedIn } from '../selectors/login';
import { getPathname, getQuery } from '../selectors/routing';

import NotAuthorized from '../components/NotAuthorized.jsx';

export default function requireAuthentication(Component) {
    @connect(mapStateToProps, { replace })
    class AuthenticatedComponent extends React.Component {
        static propTypes = {
            authenticated: PropTypes.bool.isRequired,
            pathname: PropTypes.string.isRequired,
            query: PropTypes.shape({}).isRequired,
            replace: PropTypes.func.isRequired
        };

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps() {
            this.checkAuth();
        }

        checkAuth() {
            const {
                authenticated,
                pathname,
                query,
                replace
            } = this.props;

            if (!authenticated) {
                replace({
                    pathname: '/login',
                    state: {
                        nextPathname: pathname,
                        nextQuery: query
                    }
                });
            }
        }

        render() {
            return (
                <div>
                    {
                        this.props.authenticated
                            ? <Component {...this.props} />
                            : <NotAuthorized />
                    }
                </div>
            );
        }
    }

    function mapStateToProps(state) {
        return {
            authenticated: isLoggedIn(state),
            pathname: getPathname(state),
            query: getQuery(state)
        };
    }

    return AuthenticatedComponent;
}
