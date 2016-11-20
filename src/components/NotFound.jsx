import React from 'react';

import styles from './NotFound.less';

const NotFound = () => (
    <div className={styles.root}>
        <h1>Something went wrong</h1>
        <h1>Page you are requesting cannot be found</h1>
        <h3>Error - 404</h3>
    </div>
);

export default NotFound;
