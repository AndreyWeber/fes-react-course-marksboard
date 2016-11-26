import React from 'react';
import { Redirect, Route } from 'react-router';

import requireAuthentication from './hoc/requireAuthentication';

import App from './components/App.jsx';
import LoggedInLayout from './components/LoggedInLayout.jsx';
import LoginPage from './containers/LoginPage.jsx';
import TotalScorePage from './containers/TotalScorePage.jsx';
import NotFound from './components/NotFound.jsx';

/* eslint-disable react/jsx-sort-props */
export default (
    <Route component={App}>
        <Redirect from="/" to="login" />
        <Route path="login" component={LoginPage} />
        <Route component={requireAuthentication(LoggedInLayout)}>
            <Route path="totalscore" component={TotalScorePage} />
        </Route>
        <Route path="*" component={NotFound} />
    </Route>
);
/* eslint-enable react/jsx-sort-props */
