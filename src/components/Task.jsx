import React, { PropTypes } from 'react';

import ScoreProgressBar from './ScoreProgressBar.jsx';
import PullRequestIcon from './PullRequestIcon.jsx';

import styles from './Task.less';

import { PROGRESS_BAR_COLOR_MAP } from '../constants';

const NOT_FINISHED_MESSAGE = 'Not finished yet';
const FINISHED_MESSAGE = 'Complete on ';
const FINISHED_WITH_EXCELLENCE_MESSAGE = 'Excellent! Complete on ';

const getProgressBarProps = percent => {
    if (percent === 0) {
        return {
            tooltipText: NOT_FINISHED_MESSAGE,
            strokeColor: PROGRESS_BAR_COLOR_MAP.red,
            trailColor: PROGRESS_BAR_COLOR_MAP.red
        };
    }

    if (percent > 0 && percent < 70) {
        return {
            tooltipText: `${FINISHED_MESSAGE}${percent}%`,
            strokeColor: PROGRESS_BAR_COLOR_MAP.yellow,
            trailColor: PROGRESS_BAR_COLOR_MAP.white
        };
    }

    // 70% < percent <= 100%
    return {
        tooltipText: `${FINISHED_WITH_EXCELLENCE_MESSAGE}${percent}%`,
        strokeColor: PROGRESS_BAR_COLOR_MAP.green,
        trailColor: PROGRESS_BAR_COLOR_MAP.white
    };
};

const Task = props => {
    const mark = props.mark === undefined || props.mark === null
        ? 0
        : props.mark;

    const completePercent = (mark * 100) / props.pointsMax;

    const progressBarProps = getProgressBarProps(completePercent);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.taskName}>
                    {props.name}
                </div>
                <div className={styles.taskCheckDate}>
                    {`${props.checkDate || 'N/A'}`}
                </div>
                <div className={styles.taskScore}>
                    {`${mark}/${props.pointsMax}`}
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.taskIcon}>
                    <PullRequestIcon
                        pullRequestUrl={props.pullRequestUrl}
                        size={22}
                        tooltipPosition="left"
                    />
                </div>
                <div className={styles.taskScoreProgress}>
                    <ScoreProgressBar
                        percent={completePercent}
                        strokeColor={progressBarProps.strokeColor}
                        tooltipPosition='right'
                        tooltipText={progressBarProps.tooltipText}
                        trailColor={progressBarProps.trailColor}
                    />
                </div>
            </div>
        </div>
    );
};

Task.propTypes = {
    checkDate: PropTypes.string,
    mark: PropTypes.number,
    name: PropTypes.string.isRequired,
    pointsMax: PropTypes.number.isRequired,
    pullRequestUrl: PropTypes.string
};

export default Task;
