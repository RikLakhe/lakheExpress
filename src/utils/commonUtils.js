
/**
 * Get the error message from error object
 */
export const errorHandler = error => {
    /**
     * Get unique error field name
     */
    const uniqueValueError = error => {
        return `Submitted ${Object.keys(error.keyValue)[0]} already exist.`
    };

    let message = '';
    switch (error.code) {
        case 11000:
        case 11001:
            message = uniqueValueError(error);
            break;
        default:
            message = 'Something went wrong';
    }

    return {type: 'error', message: message};
};

/**
 * Get if object is empty or not
 * @param {object} obj
 */
export const isEmpty = obj => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
};

/**
 * Get time
 */
export const getTime = () => {
    let time = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
    time = time.split(':');
    time = time.join('');
    return time;
};
