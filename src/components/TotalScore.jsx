import React, { PropTypes } from 'react';
import { appendSuffix } from 'nth';

import { randomGreeting } from '../utils/randomGreeting';

import styles from './TotalScore.less';

const TotalScore = props => {
    return (
        <div className={styles.root}>
            <div>{randomGreeting()}, <span className={styles.highlightedText}>{props.userName}!</span></div>
            <div>Your total score is:</div>
            <div className={styles.totalScore}>{props.totalScore}</div>
            {
                props.showCongrats
                    ? <div className={styles.congratsMessage}>Congrats!</div>
                    : ''
            }
            <div>You are {appendSuffix(props.ratingValue)} among {props.competitorsCount} cadets</div>
        </div>
    );
};

TotalScore.propTypes = {
    competitorsCount: PropTypes.number.isRequired,
    ratingValue: PropTypes.number.isRequired,
    showCongrats: PropTypes.bool.isRequired,
    totalScore: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired
};

export default TotalScore;
