import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Collapse } from 'react-bootstrap';

import Task from './Task.jsx';
import ScoreProgressBar from './ScoreProgressBar.jsx';
import GithubAvatarLink from './GithubAvatarLink.jsx';

import styles from './Lesson.less';

import { progressBarColorMap } from '../constants';

export default class Lesson extends Component {
    static propTypes = {
        children: ImmutablePropTypes.listOf(
            ImmutablePropTypes.map
        ),
        collapse: PropTypes.bool,
        maxScore: PropTypes.number.isRequired,
        mentorGithubLogin: PropTypes.string.isRequired,
        mentorName: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        score: PropTypes.number.isRequired,
        topic: PropTypes.string.isRequired
    };

    state = {
        collapse: this.props.collapse
    };

    collapseSelf = () => this.setState({
        collapse: !this.state.collapse
    });

    render() {
        const {
            children,
            maxScore,
            mentorName,
            mentorGithubLogin,
            number,
            score,
            topic
        } = this.props;

        const percentage = Math.floor((score * 100) / maxScore);
        return (
            <div className={styles.root}>
                <div className={styles.header}>
                    <GithubAvatarLink
                        githubLogin={mentorGithubLogin}
                        name={mentorName}
                        tooltipPosition="left"
                    />
                    <div
                        className={styles.headerText}
                        onClick={this.collapseSelf}
                    >
                        <div>{`Lesson ${number} - ${topic}`}</div>
                        <div>{`${score}/${maxScore}`}</div>
                    </div>
                </div>
                <div className={styles.lessonScoreProgress}>
                    <ScoreProgressBar
                        percent={percentage}
                        strokeColor={progressBarColorMap.green}
                        tooltipPosition="right"
                        tooltipText={`Finished on ${percentage}%`}
                        trailColor={progressBarColorMap.white}
                    />
                </div>
                <Collapse in={!this.state.collapse}>
                    <div>
                        {
                            children.map(task =>
                                <Task
                                    key={task.get('number')}
                                    maxScore={task.get('maxScore')}
                                    name={task.get('name')}
                                    prUrl={task.get('prUrl')}
                                    score={task.get('score')}
                                    timestamp={task.get('timestamp')}
                                />
                            )
                        }
                    </div>
                </Collapse>
            </div>
        );
    }
}
