import { combineReducers } from 'redux-immutable';

import login from './login';
import reviews from './reviews';
import routing from './routing';
import lessons from './lessons';
import user from './user';

export default combineReducers({
    login,
    reviews,
    routing,
    lessons,
    user
});
