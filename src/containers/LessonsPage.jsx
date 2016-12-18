import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// my libs (utils, actions)
import { fetchLessons } from '../actions';
import { isLessonsFetching } from '../selectors/lessons';

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
        isTasksFetching: PropTypes.bool.isRequired
    };

    componentWillMount() {
        this.props.fetchLessons('alexpoltava');
    }

    render() {
        return (
            <Loader loading={this.props.isTasksFetching}>
                <Lessons />
            </Loader>
        );
    }
}

function mapStateToProps(state) {
    return {
        isTasksFetching: isLessonsFetching(state)
    };
}
