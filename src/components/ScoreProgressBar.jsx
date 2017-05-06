import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'rc-progress';

import Tooltip from './Tooltip.jsx';

import styles from './ScoreProgressBar.less';

const ScoreProgressBar = ({
    percent = 0,
    strokeColor = '#EF5350',
    strokeWidth = 1,
    tooltipPosition,
    tooltipText = '',
    trailColor = '#FFFFFF',
    trailWidth = 1
}) => (
    <Tooltip position={tooltipPosition} text={tooltipText}>
        <div className={styles.progressBar}>
            <Line
                percent={percent}
                strokeColor={strokeColor}
                strokeLinecap="square"
                strokeWidth={strokeWidth}
                trailColor={trailColor}
                trailWidth={trailWidth}
            />
        </div>
    </Tooltip>
);

ScoreProgressBar.propTypes = {
    percent: PropTypes.number.isRequired,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    tooltipPosition: PropTypes.string.isRequired,
    tooltipText: PropTypes.string,
    trailColor: PropTypes.string,
    trailWidth: PropTypes.number
};

export default ScoreProgressBar;
