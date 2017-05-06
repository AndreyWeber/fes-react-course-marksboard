import React from 'react';
import PropTypes from 'prop-types';

const LoggedInLayout = props => (
    <div>
        {props.children}
    </div>
);

LoggedInLayout.propTypes = {
    children: PropTypes.element.isRequired
};

export default LoggedInLayout;
