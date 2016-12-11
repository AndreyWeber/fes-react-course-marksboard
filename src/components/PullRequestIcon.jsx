// external libs
import React, { PropTypes } from 'react';

// my libs (utils, actions)

// external components
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import GitPullRequest from 'react-icons/go/git-pull-request';

// my components

// styles
import styles from './PullRequestIcon.less';

// constants

const PullRequestIcon = props => {
    const pullRequestIcon = props.pullRequestUrl
            ? (
                <a
                    href={props.pullRequestUrl || '#'}
                    target="_blank"
                >
                    <GitPullRequest
                        className={styles.root}
                        size={16}
                    />
                </a>
            )
            : (
                <GitPullRequest
                    className={styles.root}
                    size={16}
                />
            );

    return (
        <OverlayTrigger
            delayHide={150}
            delayShow={300}
            overlay={<Tooltip id="tooltip">Task pull request</Tooltip>}
            placement={props.tooltipPosition}
        >
            {pullRequestIcon}
        </OverlayTrigger>
    );
};

PullRequestIcon.propTypes = {
    pullRequestUrl: PropTypes.string,
    tooltipPosition: PropTypes
        .oneOf(['top', 'right', 'bottom', 'left']).isRequired
};

export default PullRequestIcon;
