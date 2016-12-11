import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// my libs (utils, actions)
import { fetchTasks } from '../actions';
import { isTasksFetching } from '../selectors/tasks';

// external components

// my components
// import Loader from '../components/Loader.jsx';
import Lessons from '../components/Lessons.jsx';

// styles

// constants

@connect(mapStateToProps, { fetchTasks })
export default class LessonsPage extends Component {
    static propTypes = {
        isTasksFetching: PropTypes.bool.isRequired
    };

    // render() {
    //     return (
    //         <Loader loading={this.props.isTasksFetching}>
    //             {this.props.children}
    //         </Loader>
    //     );
    // }
    render() {
        return (
            <Lessons />
        );
    }
}

function mapStateToProps(state) {

    return {
        isTasksFetching: isTasksFetching(state)
    };
}
