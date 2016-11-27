const USER_KEY_STORAGE_NODE_NAME = 'userKey';

export const putInStorage = (node, nodeName) => {
    if (!node) {
        localStorage.setItem(nodeName, null);
    }

    localStorage.setItem(nodeName, JSON.stringify(node));
};

export const getFromStorage = nodeName => {
    return JSON.parse(localStorage.getItem(nodeName));
};

export const setUserKey = key => putInStorage(key, USER_KEY_STORAGE_NODE_NAME);

export const getUserKey = () => getFromStorage(USER_KEY_STORAGE_NODE_NAME);
