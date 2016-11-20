import React from 'react';
import { Route } from 'react-router';

import App from './components/App.jsx';
import LoginPage from './containers/LoginPage.jsx';
import NotFound from './components/NotFound.jsx';

export default (
    <Route path="/" component={App}>
        <Route path="/login" component={LoginPage} />
        <Route path="*" component={NotFound} />
    </Route>
);
