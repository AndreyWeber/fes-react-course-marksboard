import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { userLogin } from '../actions';

import Login from '../components/Login.jsx';

class LoginPage extends Component {
    static propTypes = {
        onLogin: PropTypes.func.isRequired,
        onReplace: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            login: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            login: event.target.value
        });
    }

    handleClick(event) {
        const {
            onLogin,
            onReplace
        } = this.props;

        onLogin(this.state.login);

        this.setState({
            login: ''
        });

        onReplace({
            pathname: '/test'
        });

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

export default connect(undefined, {
    onLogin: login => userLogin(login),
    onReplace: location => replace(location)
})(LoginPage);
