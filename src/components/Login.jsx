import React, { Component, PropTypes } from 'react';

import {
    Panel,
    PanelHeader,
    PanelFooter,
    InlineForm
} from 'rebass';

import styles from './Login.less';

export default class Login extends Component {
    static propTypes = {
        error: PropTypes.string,
        onLogin: PropTypes.func.isRequired
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
        this.props.onLogin(this.state.login);

        event.preventDefault();
    }

    render() {
        const panelFooter = this.props.error
            ? (
                <PanelFooter>
                    <span className={styles.errorMessage}>
                        {this.props.error}
                    </span>
                </PanelFooter>
            )
            : undefined;

        return (
            <div className={styles.root}>
                <Panel
                    rounded
                    theme="default"
                >
                    <PanelHeader>
                        Login
                    </PanelHeader>
                    <InlineForm
                        buttonLabel="Go"
                        label="Login"
                        name="inlineFormLogin"
                        placeholder="Please provide you key to login..."
                        style={{ margin: 30 }}
                        value={this.state.login}
                        onChange={this.handleChange}
                        onClick={this.handleClick}
                    />
                    {panelFooter}
                </Panel>
            </div>
        );
    }
}
