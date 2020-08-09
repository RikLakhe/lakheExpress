import {freshToken} from "../../utils/jwtUtils";

import Members from './model'
import {errorHandler, generateOTP} from "../../utils/commonUtils";

export const login = (req, res, next) => {
    const {userName, password} = req.body;
    if (!userName || !password) {
        return res
            .status(400)
            .json({
                type: 'Failed',
                message: "All fields are required!"
            })
    } else {
        Members
            .findOne({userName})
            .exec((error,response)=>{
                console.log('res',generateOTP())
                if (error || !response) {
                    return res
                        .status(400)
                        .json({
                            type: 'Failed',
                            message: "User not found, Sign up!"
                        })
                } else if(!response.authenticate(password)){
                    return res
                        .status(400)
                        .json({
                            type: 'Failed',
                            message: "User and password does not match!"
                        })
                }else if (!response.isUserVerified) {
                    return res
                        .status(400)
                        .json({
                            type: 'Failed',
                            message: "User is not verified!"
                        })
                }else{
                    res.locals.status = 200;
                    let firstToken = freshToken({
                        name: userName,
                        type: "admin"
                    }, '1 min');
                    res.locals.data = {
                        status: 'SUCCESS',
                        token: firstToken,
                        fullName:response.fullName,
                        email:response.email,
                        sex:response.sex,
                        permission: response.permission,
                        id: response._id
                    };
                    next();
                }
            })
    }
};

export const signUp = (req, res, next) => {
    if (req.body) {
        const {fullName, userName, email, password, sex, permission} = req.body;
        if (!fullName || !userName || !email || !password || !sex || !permission) {
            return res
                .status(400)
                .json({
                    type: 'Failed',
                    message: "All fields are required!"
                })
        } else {
            let createDate = Date.now();
            let verifyCode = generateOTP();
            const users = new Members({fullName, userName, email, password, sex, permission, createDate, verifyCode});

            users.save((error, response) => {
                if (!error) {

                    // sendMail({ email, userName }, 'New account', 'verify')
                    res.locals.status = 200;
                    res.locals.data = {
                        status: 'SUCCESS',
                        data: {email, userName}
                    };
                    next();
                } else {
                    return res
                        .status(400)
                        .json({
                            type: 'Failed',
                            message: errorHandler(error)
                        })
                }
            })
        }
    }
};
