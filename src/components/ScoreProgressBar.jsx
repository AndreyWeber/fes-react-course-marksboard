import React, { PropTypes } from 'react';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Line } from 'rc-progress';

import styles from './ScoreProgressBar.less';

const NOT_FINISHED_TOOLTIP = 'Not finished yet';
const FINISHED_TOOLTIP = 'Complete on ';
const FINISHED_WITH_EXCELLENCE_TOOLTIP = 'Complete on ${percent}%. Excellent!';

const colorMap = {
    white: '#FFFFFF',
    red: '#FF0000',
    yellow: '#FFA500',
    green: '#008000'
};

const getProgressBarProps = percent => {
    if (percent === 0) {
        return {
            tooltipText: NOT_FINISHED_TOOLTIP,
            strokeColor: colorMap.red,
            trailColor: colorMap.red
        };
    }

    if (percent > 0 && percent < 70) {
        return {
            tooltipText: `${FINISHED_TOOLTIP}${percent}%`,
            strokeColor: colorMap.yellow,
            trailColor: colorMap.white
        };
    }

    // 70% < percent <= 100%
    return {
        tooltipText: FINISHED_WITH_EXCELLENCE_TOOLTIP,
        strokeColor: colorMap.green,
        trailColor: colorMap.white
    };
};

const ScoreProgressBar = ({
    percent = 0,
    strokeWidth = 1,
    tooltipPosition,
    trailWidth = 1
}) => {
    const progressBarProps = getProgressBarProps(percent);

    const progressBar = (
        <div className={styles.progressBar}>
            <Line
                percent={percent}
                strokeColor={progressBarProps.strokeColor}
                strokeLinecap="square"
                strokeWidth={strokeWidth}
                trailColor={progressBarProps.trailColor}
                trailWidth={trailWidth}
            />
        </div>
    );

    return tooltipPosition === 'none'
        ? progressBar
        : (
            <OverlayTrigger
                delayHide={150}
                delayShow={300}
                overlay={
                    <Tooltip id="tooltip">
                        {progressBarProps.tooltipText}
                    </Tooltip>
                }
                placement={tooltipPosition}
            >
                {progressBar}
            </OverlayTrigger>
        );
};

ScoreProgressBar.propTypes = {
    percent: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number,
    tooltipPosition: PropTypes
        .oneOf(['top', 'right', 'bottom', 'left', 'none']).isRequired,
    trailWidth: PropTypes.number
};

export default ScoreProgressBar;
