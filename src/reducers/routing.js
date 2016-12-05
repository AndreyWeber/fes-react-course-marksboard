import { fromJS } from 'immutable';

import { LOCATION_CHANGE } from 'react-router-redux';

const routeInitialState = fromJS({
    locationBeforeTransitions: null
});

export default function routing(state = routeInitialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE: {
            return state.merge({
                locationBeforeTransitions: action.payload
            });
        }

        default: {
            return state;
        }
    }
}
