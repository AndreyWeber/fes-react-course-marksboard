import { combineReducers } from 'redux-immutable';

import login from './login';
import reviews from './reviews';
import routing from './routing';
import tasks from './tasks';
import user from './user';

export default combineReducers({
    login,
    reviews,
    routing,
    tasks,
    user
});
