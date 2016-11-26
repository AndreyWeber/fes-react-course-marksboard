import { combineReducers } from 'redux-immutable';

import routing from './routing';
import user from './user';
import login from './login';
import reviews from './reviews';

export default combineReducers({
    routing,
    user,
    login,
    reviews
});
