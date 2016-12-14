import React, { PropTypes } from 'react';

import ScoreProgressBar from './ScoreProgressBar.jsx';
import PullRequestIcon from './PullRequestIcon.jsx';

import styles from './Task.less';

const Task = props => {
    const mark = props.mark === undefined || props.mark === null
        ? 0
        : props.mark;

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
                        percent={(mark*100)/props.pointsMax}
                        tooltipPosition='right'
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
