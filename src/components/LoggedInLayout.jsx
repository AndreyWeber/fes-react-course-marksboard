import React, { PropTypes } from 'react';

const LoggedInLayout = props => (
    <div>
        {props.children}
    </div>
);

LoggedInLayout.propTypes = {
    children: PropTypes.element
};

export default LoggedInLayout;
