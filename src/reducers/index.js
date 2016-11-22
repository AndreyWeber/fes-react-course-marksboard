import { combineReducers } from 'redux-immutable';

import routing from './routing';
import user from './user';

export default combineReducers({
    routing,
    user
});
