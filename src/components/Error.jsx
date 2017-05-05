import React from 'react';
import PropTypes from 'prop-types';

import { tryParseError } from '../utils/common';

import styles from './Error.less';

const DEFAULT_ERROR_CODE = 'N/A';

const Error = ({children, code}) => (
    <div className={styles.root}>
        <div>
            <h3 className={styles.error}>
                {tryParseError(children)}
            </h3>
            <h4>
                Error code: {code || DEFAULT_ERROR_CODE}
            </h4>
        </div>
    </div>
);

Error.propTypes = {
    children: PropTypes. oneOfType([
        PropTypes.string,
        PropTypes.shape({
            message: PropTypes.string
        })
    ]),
    code: PropTypes.number
};

export default Error;
