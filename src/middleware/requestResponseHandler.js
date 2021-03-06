import AppConfig from "../config/AppConfig";
import {freshToken, isTokenExpired} from "../utils/jwtUtils";
import {decrypt, encrypt} from "../utils/cryptoUtils";

export const requestOnlyHandler = (req, res, next) => {
    // decrypt data from body and pass into next handler
    if (req && req.body) {
        const {data} = req.body;
        // no data is sent from front end send error
        if (!data) {
            res.locals.status = 401;
            res.locals.data = {
                status: 'FAIL',
                message: 'Error request'
            };

            responseHandler(req, res, next);
        } else {
            // data is send from front end encrypted, we decrypt and process the req next
            res.locals.decryptData = decrypt(data);

            next();
        }
    } else {
        res.locals.status = 401;
        res.locals.decryptData = {
            status: 'FAIL',
            message: 'Error request'
        };

        responseHandler(req, res, next);
    }
};

export const requestWithTokenHandler = (req, res, next) => {
    // token handling check token validation with time
    let tokenStatus = isTokenExpired(req.headers['xsrf-token']);
    if (!tokenStatus) {

        res.locals.newAccessToken = freshToken({status: "new token"}, '5 min');

        // decrypt data from body and pass into next handler
        if (req && req.body) {
            const {data} = req.body;

            // no data is sent from front end send error
            if (!data) {
                res.locals.status = 400;
                res.locals.encryptData = {
                    status: 'FAIL',
                    data: {type: 'warning', message: 'Error request'}
                };

                responseHandler(req, res, next);
            } else {
                // data is send from front end encrypted, we decrypt and process the req next
                res.locals.decryptData = decrypt(data);

                next();
            }
        } else {
            res.locals.status = 400;
            res.locals.encryptData = {
                status: 'FAIL',
                data: {type: 'warning', message: 'Error request'}
            };

            responseHandler(req, res, next);
        }
    } else {
        res.locals.status = 401;
        res.locals.encryptData = {
            status: 'FAIL',
            data: {type: 'warning', message: 'Unauthorized'}
        };

        responseHandler(req, res, next);
    }
};

export const requestGETWithTokenHandler = (req, res, next) => {
    // token and req decryption handling
    // token handling check token validation with time
    let tokenStatus = isTokenExpired(req.headers['xsrf-token']);
    if (!tokenStatus) {
        res.locals.newAccessToken = freshToken({status: "new token"}, '5 min');

        next();
    } else {
        res.locals.status = 401;
        res.locals.encryptData = {
            status: 'FAIL',
            data: {type: 'warning', message: 'Unauthorized'}
        };

        responseHandler(req, res, next);
    }
};

export const responseHandler = (req, res, next) => {
    return res
        .status(res.locals.status)
        .json(res.locals.data)
};


