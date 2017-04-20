import React, { Component, PropTypes } from 'react';
import {
    Button,
    FormControl,
    FormGroup,
    HelpBlock
} from 'react-bootstrap';

import styles from './Login.less';

const ENTER_KEY = 13;

export default class Login extends Component {
    static propTypes = {
        error: PropTypes.string,
        spreadsheetName: PropTypes.string,
        onLogin: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            login: ''
        };
    }

    handleLoginChange = event => {
        this.setState({
            login: event.target.value
        });
    };

    handleKeyDownOnLoginInput = event => {
        const {
            spreadsheetName,
            onLogin
        } = this.props;

        if (event.keyCode === ENTER_KEY) {
            onLogin(spreadsheetName, this.state.login);
        }
    };

    handleLogin = () => {
        const {
            spreadsheetName,
            onLogin
        } = this.props;

        onLogin(spreadsheetName, this.state.login);
    };

    render() {
        const { error } = this.props;

        return (
            <div className={styles.loginRoot}>
                <div className={styles.loginContainer}>
                    <FormGroup
                        bsSize="large"
                        className={styles.loginFormGroup}
                        controlId="formLogin"
                    >
                        <HelpBlock className={styles.loginHelpBlock}>
                            {error}
                        </HelpBlock>
                        <FormControl
                            placeholder="Please provide your key to start... :)"
                            type="text"
                            onChange={this.handleLoginChange}
                            onKeyDown={this.handleKeyDownOnLoginInput}
                        />
                        <Button
                            bsStyle="danger"
                            className={styles.loginButton}
                            onClick={this.handleLogin}
                        >
                            Take off!
                        </Button>
                    </FormGroup>
                </div>
            </div>
        );
    }
}
