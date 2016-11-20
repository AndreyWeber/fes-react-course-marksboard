import { fromJS } from 'immutable';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(history) {
    const middlewares = [
        thunk,
        routerMiddleware(history)
    ];

    const enhancers = [
        applyMiddleware(...middlewares)
    ];

    return createStore(
        rootReducer,
        fromJS({}),
        composeEnhancers(...enhancers)
    );
}
