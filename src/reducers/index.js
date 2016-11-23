import { combineReducers } from 'redux-immutable';

import routing from './routing';
import user from './user';
import login from './login';

export default combineReducers({
    routing,
    user,
    login
});
