import { putInStorage, getFromStorage } from './localStorage';

const USER_KEY_STORAGE_NODE_NAME = 'userKey';
const SPREADSHEET_NAME_STORAGE_NODE_NAME = 'spreadsheetName';

/**
 * Current User Key
 */

export const setCurrentUserKey = key =>
    putInStorage(USER_KEY_STORAGE_NODE_NAME, key);

export const getCurrentUserKey = () =>
    getFromStorage(USER_KEY_STORAGE_NODE_NAME);

/**
 * Current Spreadsheet Name
 */

export const setCurrentSpreadsheetName = name =>
    putInStorage(SPREADSHEET_NAME_STORAGE_NODE_NAME, name);

export const getCurrentSpreadsheetName = () =>
    getFromStorage(SPREADSHEET_NAME_STORAGE_NODE_NAME);
