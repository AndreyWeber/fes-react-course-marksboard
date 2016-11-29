import React, { PropTypes } from 'react';
import Spinner from 'react-spinkit';
import { ControlLabel } from 'react-bootstrap';

import styles from './Loader.less';

const Loader = props => {
    const spinner = (
        <div className={styles.spinnerContainer}>
            <Spinner
                noFadeIn
                overrideSpinnerClassName={styles.spinner}
                spinnerName="three-bounce"
            />
            <ControlLabel>Loading</ControlLabel>
        </div>
    );

    return (
        <div className={styles.root}>
            {
                props.loading
                    ? spinner
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
