import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';

import { randomGreeting } from '../utils/randomGreeting';

import styles from './TotalScore.less';

const TotalScore = props => (
    <div className={styles.root}>
        <Jumbotron bsClass={`jumbotron ${styles.totalScorePanel}`}>
            <div className={styles.totalScorePanelContent}>
                <h2>
                    {`${randomGreeting()},`} <span className={styles.userName}>{`${props.name}!`}</span>
                </h2>
                <h1>{`Your total score now is: ${props.totalScore}`}</h1>
            </div>
        </Jumbotron>
    </div>
);

TotalScore.propTypes = {
    name: PropTypes.string.isRequired,
    totalScore: PropTypes.number.isRequired
};

export default TotalScore;
