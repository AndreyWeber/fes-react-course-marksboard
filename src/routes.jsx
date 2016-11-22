import React from 'react';
import { Redirect, Route } from 'react-router';

import requireAuthentication from './hoc/requireAuthentication';

import App from './components/App.jsx';
import LoggedInLayout from './components/LoggedInLayout.jsx';
import LoginPage from './containers/LoginPage.jsx';
import NotFound from './components/NotFound.jsx';

const TestPage = () => (
    <h1>Test Page After Login</h1>
);

const TestPage1 = () => (
    <h1>Test Page 1 After Login</h1>
);

export default (
    <Route component={App}>
        <Redirect from="/" to="login" />
        <Route component={LoginPage} path="login" />
        <Route component={requireAuthentication(LoggedInLayout)}>
            <Route component={TestPage} path="test" />
        </Route>
        <Route component={NotFound} path="*" />
    </Route>
);
