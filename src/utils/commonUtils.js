
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
            if(!isEmpty(Object.keys(error.errors))){
                message = error.errors[(Object.keys(error.errors)[0])].properties.message;
            }else{
                message = 'Something went wrong';
            }

    }

    return message;
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

/**
 * Get OTP for verification
 */
export const generateOTP = () =>{
    let code = ''
    for(let i = 0;i<=5;i++){
        code += Math.floor(Math.random() * 9);
    }
    return code
}
