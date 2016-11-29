import React, { Component, PropTypes } from 'react';

import {
    Button,
    Col,
    Form,
    FormControl,
    FormGroup,
    HelpBlock,
    InputGroup,
    Panel
} from 'react-bootstrap';

import styles from './Login.less';

const ENTER_KEY = 13;

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
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleChange(event) {
        this.setState({
            login: event.target.value
        });
    }

    handleClick() {
        this.props.onLogin(this.state.login);
    }

    handleKeyDown(event) {
        if (event.keyCode === ENTER_KEY) {
            this.props.onLogin(this.state.login);
        }
    }

    render() {
        const { error } = this.props;

        const title = (<h3 className={styles.loginFormHeader}>Login</h3>);

        return (
            <div className={styles.root}>
                <Panel header={title}>
                    <Form
                        horizontal
                        style={{ paddingTop: 20}}
                    >
                        <Col xs={12}>
                            <FormGroup
                                controlId="formLogin"
                                validationState={error ? 'error' : null}
                            >
                                <InputGroup>
                                    <FormControl
                                        placeholder="Please provide you user key to login..."
                                        type="text"
                                        onChange={this.handleChange}
                                        onKeyDown={this.handleKeyDown}
                                    />
                                    <InputGroup.Button>
                                        <Button
                                            onClick={this.handleClick}
                                        >
                                            Login
                                        </Button>
                                    </InputGroup.Button>
                                </InputGroup>
                                <HelpBlock>{error}</HelpBlock>
                            </FormGroup>
                        </Col>
                    </Form>
                </Panel>
            </div>
        );
    }
}
