import { createSelector } from 'reselect';

const SPREADSHEET_NAME_QUERY_PARAM = 'ssname';

export const getLocation = state =>
    state.getIn(['routing', 'locationBeforeTransitions']);

export const getQuery = createSelector(
    getLocation,
    location => location.get('query')
);

export const getSpreadsheetNameFromQuery = createSelector(
    getQuery,
    query => query.get(SPREADSHEET_NAME_QUERY_PARAM)
);

export const getSearch = createSelector(
    getLocation,
    location => location.get('search')
);

export const getPathname = createSelector(
    getLocation,
    location => location.get('pathname')
);

export const getLocationState = createSelector(
    getLocation,
    location => location.get('state')
);
