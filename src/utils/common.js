/**
 * Try extract text message from error object
 * @param {Object|Error|String} error - error object
 * @returns {String}
 */
export const tryParseError = error => {
    const defaultMsg = 'Unknown error occurred';

    if (!error || error === '') {
        return defaultMsg;
    }

    if (typeof error === typeof 'string') {
        return error;
    }

    if (error instanceof Error) {
        return error.message;
    }

    if (error instanceof Object && error.message) {
        return error.message;
    }

    return defaultMsg;
};
