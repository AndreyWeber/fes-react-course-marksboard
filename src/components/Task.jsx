// external libs
import React, { PropTypes } from 'react';

// my libs (utils, actions)
import {
    TASK_NOT_FINISHED,
    TASK_FINISHED,
    TASK_FINISHED_WITH_EXCELLENCE
} from '../constants';

// external components

// my components
import TaskStatusIcon from './TaskStatusIcon.jsx';
import PullRequestIcon from './PullRequestIcon.jsx';

// styles
import styles from './Task.less';

// constants

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
                <div>{props.name}</div>
                <div>
                    {`${mark}/${props.pointsMax}`}
                </div>
            </div>
            <div className={styles.footer}>
                <TaskStatusIcon
                    taskStatus={getTaskStatus(props)}
                    tooltipPosition="left"
                />
                <PullRequestIcon
                    pullRequestUrl={props.pullRequestUrl}
                    tooltipPosition="top"
                />
                {`${props.checkDate || 'N/A'}`}
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
