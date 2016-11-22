import React, { PropTypes } from 'react';

const Loader = props => {
    return (
        <div>
            {
                props.loading
                    ? 'Loading...'
                    : props.children
            }
        </div>
    );
};

Loader.propTypes = {
    children: PropTypes.node.isRequired,
    loading: PropTypes.bool.isRequired
};

export default Loader;
