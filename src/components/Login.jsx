import React, { Component, PropTypes } from 'react';

import { Panel, PanelHeader, InlineForm } from 'rebass';

import styles from './Login.less';

export default class Login extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired
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
        this.props.onClick(this.state.login);

        event.preventDefault();
    }

    render() {
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
                        placeholder="Provide you login here..."
                        style={{ margin: 30 }}
                        value={this.state.login}
                        onChange={this.handleChange}
                        onClick={this.handleClick}
                    />
                </Panel>
            </div>
        );
    }
}
