import React, { PropTypes } from 'react';

import { CubeGrid  } from 'better-react-spinkit';

import styles from './Spinner.less';

const Spinner = ({ labelText }) => (
    <div className={styles.root}>
        <CubeGrid
            color='#EF5350'
            size={70}
        />
        <div className={styles.label}>
            {labelText}
        </div>
    </div>
);

Spinner.propTypes = {
    labelText: PropTypes.string.isRequired
};

export default Spinner;
