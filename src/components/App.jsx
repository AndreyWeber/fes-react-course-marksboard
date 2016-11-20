// external libs
import React, { PropTypes } from 'react';

// my libs (utils, actions)

// external components

// my components

// styles
import styles from './App.less';

// constants

const App = props => (
    <div className={styles.root}>
        <h1>App page</h1>
        {props.children}
    </div>
);

App.propTypes = {
    children: PropTypes.node
};

export default App;
