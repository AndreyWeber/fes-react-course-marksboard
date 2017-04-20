import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getUserName } from '../selectors/user';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

const NavigationBar = ({ userName }) => (
    <Navbar fixedTop>
        <Nav>
            <NavItem eventKey={1} href="/totalscore">Total Score</NavItem>
            <NavItem eventKey={2} href="/lessons">Lessons</NavItem>
        </Nav>
        <Navbar.Text pullRight>
            Signed in as: {userName}
        </Navbar.Text>
    </Navbar>
);

NavigationBar.propTypes = {
    userName: PropTypes.string.isRequired
};

const mapStateToProps = state => ({ userName: getUserName(state) });

export default connect(mapStateToProps, undefined)(NavigationBar);
