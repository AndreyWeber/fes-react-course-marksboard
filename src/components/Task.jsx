// external libs
import React, { PropTypes } from 'react';

// my libs (utils, actions)

// external components
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import FaCircle from 'react-icons/fa/circle';
import GitPullRequest from 'react-icons/go/git-pull-request';
// my components

// styles
import styles from './Task.less';

// constants

const getTaskStatusIcon = (tooltip, { mark, pointsMax }) => {
    let tooltipMsg,
        taskStatusStyle;
    if (mark === undefined || mark === null) {
        tooltipMsg = 'Task not finished yet';
        taskStatusStyle = styles.taskStatusNotFinished;
    } else if (mark === pointsMax) {
        tooltipMsg = 'Task complete. Excellent!';
        taskStatusStyle = styles.taskStatusExcellent;
    } else if (mark < pointsMax) {
        taskStatusStyle = styles.taskStatusAverage;
        tooltipMsg = 'Task complete.';
    }

    return (
        <OverlayTrigger
            delayHide={150}
            delayShow={300}
            overlay={tooltip(tooltipMsg)}
            placement="left"
        >
            <FaCircle
                className={taskStatusStyle}
                size={14}
            />
        </OverlayTrigger>
    );
};

const getTooltip = text => <Tooltip id="tooltip">{text}</Tooltip>;

const Task = props => {
    const mark = props.mark === undefined || props.mark === null
        ? '-'
        : props.mark;

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div>{props.name}</div>
                <div>{`${mark}/${props.pointsMax}`}</div>
            </div>
            <div className={styles.footer}>
                {getTaskStatusIcon(getTooltip, props)}
                <a href="http://ya.ru">
                    <GitPullRequest className={styles.pullRequestIcon} />
                </a>
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
