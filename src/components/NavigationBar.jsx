import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getUserName } from '../selectors/user';
import { getSearch } from '../selectors/routing';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

const NavigationBar = ({ search, userName }) => (
    <Navbar fixedTop>
        <Nav>
            <NavItem eventKey={1} href={`/totalscore${search}`}>Total Score</NavItem>
            <NavItem eventKey={2} href={`/lessons${search}`}>Lessons</NavItem>
        </Nav>
        <Navbar.Text pullRight>
            Signed in as: {userName}
        </Navbar.Text>
    </Navbar>
);

NavigationBar.propTypes = {
    search: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    search: getSearch(state),
    userName: getUserName(state)
});

export default connect(mapStateToProps, undefined)(NavigationBar);
