import ReactDOM from 'react-dom';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import routes from './routes.jsx';
import configureStore from './store';

import { userLogin } from './actions';
import { getCurrentUserKey, getCurrentSpreadsheetName } from './utils/session';
import { getSpreadsheetNameFromQuery } from './selectors/routing';

import 'normalize.css';
import './assets/main.less';

const store = configureStore(browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState(state) {
        return state.get('routing').toJS();
    }
});

function renderApp() {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                {routes}
            </Router>
        </Provider>,
        document.getElementById('root')
    );
}

function startApp() {
    const userKey = getCurrentUserKey();
    const spreadsheetName = getCurrentSpreadsheetName() ||
        getSpreadsheetNameFromQuery(store.getState());
    if (userKey && spreadsheetName) {
        store.dispatch(userLogin(spreadsheetName, userKey, renderApp));
    } else {
        renderApp();
    }
}

startApp();
