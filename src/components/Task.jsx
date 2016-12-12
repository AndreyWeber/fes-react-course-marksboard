import React, { PropTypes } from 'react';

import {
    TASK_NOT_FINISHED,
    TASK_FINISHED,
    TASK_FINISHED_WITH_EXCELLENCE
} from '../constants';

import TaskStatusIcon from './TaskStatusIcon.jsx';
import PullRequestIcon from './PullRequestIcon.jsx';

import styles from './Task.less';

const getTaskStatus = ({mark, pointsMax}) => {
    if (mark === undefined || mark === null) {
        return TASK_NOT_FINISHED;
    }

    if (mark === pointsMax) {
        return TASK_FINISHED_WITH_EXCELLENCE;
    }

    return TASK_FINISHED;
};

const Task = props => {
    const mark = props.mark === undefined || props.mark === null
        ? '-'
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
                    <TaskStatusIcon
                        size={22}
                        taskStatus={getTaskStatus(props)}
                        tooltipPosition="left"
                    />
                </div>
                <div className={styles.taskIcon}>
                    <PullRequestIcon
                        pullRequestUrl={props.pullRequestUrl}
                        size={22}
                        tooltipPosition="right"
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
