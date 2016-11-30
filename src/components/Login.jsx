import React, { Component, PropTypes } from 'react';
import {
    Button,
    Col,
    Form,
    FormControl,
    FormGroup,
    Glyphicon,
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

        return (
            <div className={styles.root}>
                <Form horizontal>
                    <Col xs={12}>
                        <FormGroup
                            bsSize="large"
                            controlId="formLogin"
                        >
                            <HelpBlock style={{color: 'black', fontWeight: 'bold'}}>
                                {error}
                            </HelpBlock>
                            <FormControl
                                placeholder="Please give us you magic user key... :)"
                                type="text"
                                onChange={this.handleChange}
                                onKeyDown={this.handleKeyDown}
                            />

                            <Col
                                style={{marginTop: 20}}
                                xs={6}
                                xsOffset={4}
                            >
                                <Button
                                    bsStyle="success"
                                    onClick={this.handleClick}
                                >
                                    Come in, please
                                </Button>
                            </Col>
                        </FormGroup>
                    </Col>
                </Form>
            </div>
        );
    }
}
