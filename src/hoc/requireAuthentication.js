import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { isCurrentUserLoggedIn } from '../selectors/user';
import { getPathname, getQuery } from '../selectors/routing';

export default function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {
        static propTypes = {
            currentPathname: PropTypes.string.isRequired,
            currentQuery: PropTypes.shape({}).isRequired,
            isAuthenticated: PropTypes.bool.isRequired,
            onReplace: PropTypes.func.isRequired
        };

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps() {
            this.checkAuth();
        }

        checkAuth() {
            const {
                currentPathname,
                currentQuery,
                isAuthenticated,
                onReplace
            } = this.props;

            if (!isAuthenticated) {
                onReplace({
                    pathname: '/login',
                    state: {
                        nextPathname: currentPathname,
                        nextQuery: currentQuery
                    }
                });
            }
        }

        render() {
            return (
                <div>
                    {
                        this.props.isAuthenticated
                            ? <Component {...this.props} />
                            : null
                    }
                </div>
            );
        }
    }

    return connect(mapStateToProps, {
        onReplace: location => replace(location)
    })(AuthenticatedComponent);
}

function mapStateToProps(state) {
    return {
        isAuthenticated: isCurrentUserLoggedIn(state),
        currentPathname: getPathname(state),
        currentQuery: getQuery(state)
    };
}
