import React from 'react';
import PropTypes from 'prop-types';
import { appendSuffix } from 'nth';

import { randomGreeting } from '../utils/randomGreeting';

import styles from './TotalScore.less';

const TotalScore =
    ({
         competitorsCount,
         ratingValue,
         showCongrats,
         totalScore,
         userName
    }) => (
        <div className={styles.root}>
            <div>{randomGreeting()}, <span className={styles.highlightedText}>{userName}!</span></div>
            <div>Your total score is:</div>
            <div className={styles.totalScore}>{totalScore}</div>
            {
                showCongrats
                    ? <div className={styles.congratsMessage}>Congrats!</div>
                    : ''
            }
            <div>You are {appendSuffix(ratingValue)} among {competitorsCount} cadets</div>
        </div>
    );

TotalScore.propTypes = {
    competitorsCount: PropTypes.number.isRequired,
    ratingValue: PropTypes.number.isRequired,
    showCongrats: PropTypes.bool.isRequired,
    totalScore: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired
};

export default TotalScore;
