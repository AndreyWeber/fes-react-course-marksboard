import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

// my libs (utils, actions)
import { fetchLessons } from '../actions';
import { getUserLogin } from '../selectors/user';
import {
    isLessonsFetching,
    getLessonItems
} from '../selectors/lessons';

// external components

// my components
import Loader from '../components/Loader.jsx';
import Lessons from '../components/Lessons.jsx';

// styles

// constants

@connect(mapStateToProps, { fetchLessons })
export default class LessonsPage extends Component {
    static propTypes = {
        fetchLessons: PropTypes.func.isRequired,
        isLessonsFetching: PropTypes.bool.isRequired,
        lessonItems: ImmutablePropTypes.list.isRequired,
        userLogin: PropTypes.string.isRequired
    };

    componentWillMount() {
        this.props.fetchLessons(this.props.userLogin);
    }

    render() {
        return (
            <Loader loading={this.props.isLessonsFetching}>
                <Lessons>
                    {this.props.lessonItems}
                </Lessons>
            </Loader>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLessonsFetching: isLessonsFetching(state),
        lessonItems: getLessonItems(state),
        userLogin: getUserLogin(state)
    };
}
