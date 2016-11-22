import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { userLogin } from '../actions';
import { isUserLoggingIn } from '../selectors/user';

import Login from '../components/Login.jsx';

@connect(mapStateToProps, { replace, userLogin })
export default class LoginPage extends Component {
    static propTypes = {
        loggingIn: PropTypes.bool.isRequired,
        replace: PropTypes.func.isRequired,
        userLogin: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            login: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loggingIn) {
            return;
        }

        // TODO: Add error handling
        // TODO: Add router state handling

        this.props.replace({
            pathname: '/test'
        });
    }

    handleChange(event) {
        this.setState({
            login: event.target.value
        });
    }

    handleClick(event) {
        this.props.userLogin(this.state.login);

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Login
                    value={this.state.login}
                    onChange={this.handleChange}
                    onClick={this.handleClick}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loggingIn: isUserLoggingIn(state)
    };
}
