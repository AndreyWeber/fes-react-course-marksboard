import React, { PropTypes } from 'react';

import GitPullRequest from 'react-icons/go/git-pull-request';

import Tooltip from './Tooltip.jsx';

import styles from './PullRequestIcon.less';

const PullRequestIcon = ({pullRequestUrl = '', size = 14, tooltipPosition}) => (
    <Tooltip
        position={tooltipPosition}
        text="Task pull request"
    >
        {
            pullRequestUrl
                ? (
                    <a
                        href={pullRequestUrl}
                        target="_blank"
                    >
                        <GitPullRequest
                            className={styles.iconEnabled}
                            size={size}
                            style={{color: '#FFFFFF'}}
                        />
                    </a>
                )
                : (
                    <GitPullRequest
                        className={styles.iconDisabled}
                        size={size}
                    />
                )
        }
    </Tooltip>
);

PullRequestIcon.propTypes = {
    pullRequestUrl: PropTypes.string,
    size: PropTypes.number,
    tooltipPosition: PropTypes.string.isRequired
};

export default PullRequestIcon;
