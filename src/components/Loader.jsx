import React, { PropTypes } from 'react';
import { Heading, Overlay } from 'rebass';

import styles from './Loader.less';

const Loader = props => {
    const overlay = (
        <Overlay
            box
            dark
            fullWidth
            open
        >
            <Heading
                level={2}
                style={{textAlign: 'center'}}
            >
                Loading...
            </Heading>
        </Overlay>
    );

    return (
        <div className={styles.root}>
            {
                props.loading
                    ? overlay
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
