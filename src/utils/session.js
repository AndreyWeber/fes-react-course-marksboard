import { putInStorage, getFromStorage } from './localStorage';

const USER_KEY_STORAGE_NODE_NAME = 'userKey';

export const setCurrentUserKey = key => putInStorage(key, USER_KEY_STORAGE_NODE_NAME);

export const getCurrentUserKey = () => getFromStorage(USER_KEY_STORAGE_NODE_NAME);
