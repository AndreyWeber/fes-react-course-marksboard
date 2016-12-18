// external libs
import React, { Component, PropTypes } from 'react';

// my libs (utils, actions)

// external components
import { Collapse } from 'react-bootstrap';

// my components
import Task from './Task.jsx';
import ScoreProgressBar from './ScoreProgressBar.jsx';
import GithubAvatarLink from './GithubAvatarLink.jsx';

// styles
import styles from './Lesson.less';

// constants
import { progressBarColorMap } from '../constants';

export default class Lesson extends Component {
    static propTypes = {
        collapse: PropTypes.bool,
        mentorLogin: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
    };

    state = {
        collapse: this.props.collapse
    };

    collapseSelf = () => this.setState({
        collapse: !this.state.collapse
    });

    render() {
        const {
            mentorLogin,
            name,
            number
        } = this.props;

        return (
            <div className={styles.root}>
                <div className={styles.header}>
                    <GithubAvatarLink
                        githubLogin={mentorLogin}
                        tooltipPosition="left"
                    />
                    <div
                        className={styles.headerText}
                        onClick={this.collapseSelf}
                    >
                        <div>{`Lesson ${number} - ${name}`}</div>
                        <div>5/6</div>
                    </div>
                </div>
                <div className={styles.lessonScoreProgress}>
                    <ScoreProgressBar
                        percent={500/6}
                        strokeColor={progressBarColorMap.green}
                        tooltipPosition="none"
                        trailColor={progressBarColorMap.white}
                    />
                </div>
                <Collapse in={!this.state.collapse}>
                    <div>
                        <Task checkDate="06.12.2016 22:23:44" name="Little tasks about arrays" pointsMax={1} />
                        {/*<Task mark={1} name="Some very very very very long task name. Really long. Indeed. Much longer then you can imagine." pointsMax={1} />*/}
                        <Task mark={11} name="Little tasks about arrays" pointsMax={20} />
                        <Task mark={1} name="Little tasks about arrays" pointsMax={1} />
                        <Task mark={0} name="Little tasks about arrays"  pointsMax={1} />
                        <Task mark={1} name="Little tasks about arrays"  pointsMax={1} />
                    </div>
                </Collapse>
            </div>
        );
    }
}
