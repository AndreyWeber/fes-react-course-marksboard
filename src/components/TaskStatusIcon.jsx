import React, { PropTypes } from 'react';

import {
    TASK_NOT_FINISHED,
    TASK_FINISHED,
    TASK_FINISHED_WITH_EXCELLENCE
} from '../constants';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import FaCircle from 'react-icons/fa/circle';

import styles from './TaskStatusIcon.less';

const TASK_NOT_FINISHED_TOOLTIP_TEXT = 'Task not finished yet';
const TASK_FINISHED_TOOLTIP_TEXT = 'Task complete';
const TASK_FINISHED_WITH_EXCELLENCE_TOOLTIP_TEXT = 'Task complete. Excellent!';

const getStatusIconProps = taskStatus => {
    switch (taskStatus) {
        default:
        case TASK_NOT_FINISHED: {
            return {
                tooltipText: TASK_NOT_FINISHED_TOOLTIP_TEXT,
                iconStyle: styles.notFinished
            };
        }

        case TASK_FINISHED: {
            return {
                tooltipText: TASK_FINISHED_TOOLTIP_TEXT,
                iconStyle: styles.finished
            };
        }

        case TASK_FINISHED_WITH_EXCELLENCE: {
            return {
                tooltipText: TASK_FINISHED_WITH_EXCELLENCE_TOOLTIP_TEXT,
                iconStyle: styles.finishedExcellent
            };
        }
    }
};

const TaskStatusIcon = ({size = 14, taskStatus, tooltipPosition}) => {
    const iconProps = getStatusIconProps(taskStatus);

    return (
        <OverlayTrigger
            delayHide={150}
            delayShow={300}
            overlay={
                <Tooltip id="tooltip">
                    {iconProps.tooltipText}
                </Tooltip>
            }
            placement={tooltipPosition}
        >
            <FaCircle
                className={iconProps.iconStyle}
                size={size}
            />
        </OverlayTrigger>
    );
};

TaskStatusIcon.propTypes = {
    size: PropTypes.number,
    taskStatus: PropTypes
        .oneOf([
            TASK_NOT_FINISHED,
            TASK_FINISHED,
            TASK_FINISHED_WITH_EXCELLENCE
        ]).isRequired,
    tooltipPosition: PropTypes
        .oneOf(['top', 'right', 'bottom', 'left']).isRequired
};

export default TaskStatusIcon;
