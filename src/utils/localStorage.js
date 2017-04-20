export const putInStorage = (nodeName, nodeVal) => {
    if (!nodeName) {
        throw new Error("Local Storage node name not defined. Can't create node.");
    }

    if (!nodeVal) {
        localStorage.setItem(nodeName, null);
    }

    localStorage.setItem(nodeName, JSON.stringify(nodeVal));
};

export const getFromStorage = nodeName => {
    const nodeVal = localStorage.getItem(nodeName);

    return nodeVal ? JSON.parse(nodeVal) : null;
};

