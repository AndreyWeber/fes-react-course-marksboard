import { combineReducers } from 'redux-immutable';

import login from './login';
import reviews from './reviews';
import routing from './routing';
import user from './user';

export default combineReducers({
    login,
    reviews,
    routing,
    user
});
