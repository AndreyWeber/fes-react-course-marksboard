import React from 'react';
import { Redirect, Route } from 'react-router';

import requireAuthentication from './hoc/requireAuthentication';

import App from './components/App.jsx';
import LoggedInLayout from './components/LoggedInLayout.jsx';
import LoginPage from './containers/LoginPage.jsx';
import TotalScorePage from './containers/TotalScorePage.jsx';
import NotFound from './components/NotFound.jsx';


export default (
    <Route component={App}>
        <Redirect from="/" to="login" />
        <Route component={LoginPage} path="login" />
        <Route component={requireAuthentication(LoggedInLayout)}>
            <Route component={TotalScorePage} path="totalscore" />
        </Route>
        <Route component={NotFound} path="*" />
    </Route>
);
