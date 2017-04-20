import React, { PropTypes } from 'react';

import Spinner from './Spinner.jsx';

import styles from './Loader.less';

const Loader = props => {
    return (
        <div className={styles.loaderRoot}>
            {
                props.loading
                    ? <Spinner labelText="Hyper jump is in progress" />
                    : props.children
            }
        </div>
    );
};

Loader.propTypes = {
    children: PropTypes.node.isRequired,
    loading: PropTypes.bool.isRequired
};

export default Loader;
