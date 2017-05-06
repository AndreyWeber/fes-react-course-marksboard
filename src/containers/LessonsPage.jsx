import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { fetchLessons } from '../actions';
import { getCurrentSpreadsheetName } from '../utils/session';
import { getUserLogin } from '../selectors/user';
import { isLessonsFetching, getLessonItems } from '../selectors/lessons';
import { getSpreadsheetNameFromQuery } from '../selectors/routing';

import Loader from '../components/Loader.jsx';
import Lessons from '../components/Lessons.jsx';
import NavigationBar from '../components/NavigationBar.jsx';

@connect(mapStateToProps, { fetchLessons })
export default class LessonsPage extends Component {
    static propTypes = {
        fetchLessons: PropTypes.func.isRequired,
        isLessonsFetching: PropTypes.bool.isRequired,
        lessonItems: ImmutablePropTypes.list.isRequired,
        spreadsheetName: PropTypes.string,
        userLogin: PropTypes.string.isRequired
    };

    componentWillMount() {
        const {
            fetchLessons,
            spreadsheetName,
            userLogin
        } = this.props;

        fetchLessons(spreadsheetName, userLogin);
    }

    render() {
        return (
            <Loader loading={this.props.isLessonsFetching}>
                <NavigationBar />
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
        spreadsheetName: getCurrentSpreadsheetName() || getSpreadsheetNameFromQuery(state),
        userLogin: getUserLogin(state)
    };
}
