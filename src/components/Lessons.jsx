// external libs
import React from 'react';

// my libs (utils, actions)

// external components

// my components
import Lesson from './Lesson.jsx';

// styles
import styles from './Lessons.less';

// constants

const Lessons = () => (
    <div className={styles.root}>
        <div className={styles.lessons}>
            <Lesson
                mentorLogin="krambertech"
                name="Introduction"
                number="1"
            />
            <Lesson
                mentorLogin="krambertech"
                name="Introduction"
                number="1"
            />
        </div>
    </div>
);

//Lessons.propTypes = {};

export default Lessons;
