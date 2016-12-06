import React, { PropTypes } from 'react';
import { CubeGrid  } from 'better-react-spinkit';

import styles from './Loader.less';

const Loader = props => {
    const spinner = (
        <div className={styles.spinnerContainer}>
            <CubeGrid
                color='#EF5350'
                size={70}
            />
            <div className={styles.spinnerLabel}>
                Hyper jump is in progress
            </div>
        </div>
    );

    return (
        <div className={styles.loaderRoot}>
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
