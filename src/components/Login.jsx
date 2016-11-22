import React, { PropTypes } from 'react';

import { Panel, PanelHeader, InlineForm } from 'rebass';

import styles from './Login.less';

const Login = props => (
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
                value={props.value}
                onChange={props.onChange}
                onClick={props.onClick}
            />
        </Panel>
    </div>
);

Login.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Login;
