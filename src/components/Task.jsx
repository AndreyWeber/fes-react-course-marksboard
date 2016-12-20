import React, { PropTypes } from 'react';

import ScoreProgressBar from './ScoreProgressBar.jsx';
import PullRequestIcon from './PullRequestIcon.jsx';

import styles from './Task.less';

import { progressBarColorMap } from '../constants';

const NOT_FINISHED_MESSAGE = 'Not finished yet';
const FINISHED_MESSAGE = 'Complete on ';
const FINISHED_WITH_EXCELLENCE_MESSAGE = 'Excellent! Complete on ';

const getProgressBarProps = percent => {
    if (percent === 0) {
        return {
            tooltipText: NOT_FINISHED_MESSAGE,
            strokeColor: progressBarColorMap.red,
            trailColor: progressBarColorMap.red
        };
    }

    if (percent > 0 && percent < 70) {
        return {
            tooltipText: `${FINISHED_MESSAGE}${percent}%`,
            strokeColor: progressBarColorMap.yellow,
            trailColor: progressBarColorMap.white
        };
    }

    // 70% < percent <= 100%
    return {
        tooltipText: `${FINISHED_WITH_EXCELLENCE_MESSAGE}${percent}%`,
        strokeColor: progressBarColorMap.green,
        trailColor: progressBarColorMap.white
    };
};

const Task = props => {
    const completePercent = Math.floor((props.score * 100) / props.maxScore);

    const progressBarProps = getProgressBarProps(completePercent);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.taskName}>
                    {props.name}
                </div>
                <div className={styles.taskTimestamp}>
                    {`${props.timestamp || 'N/A'}`}
                </div>
                <div className={styles.taskScore}>
                    {`${props.score}/${props.maxScore}`}
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.taskPullRequestIcon}>
                    <PullRequestIcon
                        pullRequestUrl={props.prUrl}
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
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    prUrl: PropTypes.string,
    score: PropTypes.number.isRequired,
    timestamp: PropTypes.string
};

export default Task;
