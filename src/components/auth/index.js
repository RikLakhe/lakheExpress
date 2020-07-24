import {freshToken} from "../../utils/jwtUtils";

export const login = (req, res, next) => {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res
                .status(400)
                .json({
                    type: 'Failed',
                    message : "All fields are required!"
                })
        } else {
            if(userName==='test' && password==="1234"){
                res.locals.status = 200;
                let firstToken = freshToken({
                    name: userName,
                    type: "admin"
                }, '1 min');
                res.locals.data = {
                    status: 'SUCCESS',
                    token: firstToken,
                    permission: "admin"
                };
                next();
            }else{
                return res
                    .status(400)
                    .json({
                        type: 'Failed',
                        message : "Invalid username or password!"
                    })
            }
        }
};
