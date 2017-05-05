import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Lesson from './Lesson.jsx';

import styles from './Lessons.less';

const Lessons = props => (
    <div className={styles.root}>
        <div className={styles.lessons}>
            {
                props.children.map((lesson, idx) =>
                    <Lesson
                        collapse={idx !== 0}
                        key={lesson.get('number')}
                        maxScore={lesson.get('maxScore')}
                        mentorGithubLogin={lesson.get('mentorGithubLogin')}
                        mentorName={lesson.get('mentorName')}
                        number={lesson.get('number')}
                        score={lesson.get('score')}
                        topic={lesson.get('topic')}
                    >
                        {lesson.get('tasks')}
                    </Lesson>
                )
            }
        </div>
    </div>
);

Lessons.propTypes = {
    children: ImmutablePropTypes.listOf(
        ImmutablePropTypes.map.isRequired
    ).isRequired
};

export default Lessons;
