import { combineReducers } from 'redux-immutable';

import routing from './routing';
import login from './login';
import reviews from './reviews';

export default combineReducers({
    routing,
    login,
    reviews
});
