import React, { PropTypes } from 'react';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import GitPullRequest from 'react-icons/go/git-pull-request';

import styles from './PullRequestIcon.less';

const PullRequestIcon = ({pullRequestUrl = '', size = 14, tooltipPosition}) => {
    const gitPullRequest = (
        <GitPullRequest
            className={styles.root}
            size={size}
        />
    );

    return (
        <OverlayTrigger
            delayHide={150}
            delayShow={300}
            overlay={<Tooltip id="tooltip">Task pull request</Tooltip>}
            placement={tooltipPosition}
        >
            {
                pullRequestUrl
                    ? (
                        <a
                            href={pullRequestUrl}
                            target="_blank"
                        >
                            {gitPullRequest}
                        </a>
                    )
                    : gitPullRequest
            }
        </OverlayTrigger>
    );
};

PullRequestIcon.propTypes = {
    pullRequestUrl: PropTypes.string,
    size: PropTypes.number,
    tooltipPosition: PropTypes
        .oneOf(['top', 'right', 'bottom', 'left']).isRequired
};

export default PullRequestIcon;
