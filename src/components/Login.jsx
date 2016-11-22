// external libs
import React, { PropTypes } from 'react';

// my libs (utils, actions)

// external components
import { Panel, PanelHeader, InlineForm } from 'rebass';

// my components

// styles
import styles from './Login.less';

// constants

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
