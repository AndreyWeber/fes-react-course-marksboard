import React, { PropTypes } from 'react';
import { Block, Heading } from 'rebass';

import { randomGreeting } from '../utils';

import styles from './TotalScore.less';

const TotalScore = props => (
    <div className={styles.root}>
        <Block
            borderColor="blue"
            borderLeft
            color="black"
            px={2}
            py={1}
        >
            <Heading level={1} size={1}>
                {`${randomGreeting()}, ${props.name}!`}
            </Heading>
            <Heading level={1} size={0}>
                {`Your total score now is: ${props.totalScore}`}
            </Heading>
        </Block>
    </div>
);

TotalScore.propTypes = {
    name: PropTypes.string.isRequired,
    totalScore: PropTypes.number.isRequired
};

export default TotalScore;
