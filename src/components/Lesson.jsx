// external libs
import React, { PropTypes } from 'react';

// my libs (utils, actions)

// external components
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// my components
import Task from './Task.jsx';

// styles
import styles from './Lesson.less';

// constants
const GITHUB_URL = 'https://github.com/';

const getTooltip = text => <Tooltip id="tooltip">{text}</Tooltip>;

const Lesson = props => (
    <div className={styles.root}>
        <div className={styles.header}>
            <OverlayTrigger
                delayHide={150}
                delayShow={300}
                overlay={getTooltip(props.mentorLogin)}
                placement="left"
            >
                <a
                    href={`${GITHUB_URL}${props.mentorLogin}`}
                    target="_blank"
                >
                    <img
                        className={styles.mentorAvatar}
                        src={`${GITHUB_URL}${props.mentorLogin}.png`}
                    />
                </a>
            </OverlayTrigger>
            <div className={styles.headerText}>
                <div>{`Lesson ${props.number} - Introduction`}</div>
                <div>5/6</div>
            </div>
        </div>
        <div>
            <Task checkDate="06.12.2016 22:23:44" name="Little tasks about arrays" pointsMax={1} />
            <Task mark={1} name="Little tasks about arrays" pointsMax={1} />
            <Task mark={1} name="Little tasks about arrays" pointsMax={1} />
            <Task mark={1} name="Little tasks about arrays" pointsMax={1} />
            <Task mark={0} name="Little tasks about arrays"  pointsMax={1} />
            <Task mark={1} name="Little tasks about arrays"  pointsMax={1} />
        </div>
    </div>
);

Lesson.propTypes = {
    mentorLogin: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
};

export default Lesson;
