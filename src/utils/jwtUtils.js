import jwt from 'jsonwebtoken'
import AppConfig from "../config/AppConfig";

const decodeToken = (Token) => {
    return jwt.decode(Token, AppConfig.jwtSecret);
};

export const freshToken = (formData, timeDuration) => {
    console.log('ggg',AppConfig.jwtSecret)
    return jwt.sign(
        formData,
        process.env.JWT_SECRET,
        {
            expiresIn: timeDuration,
        }
    );
};

export const isTokenExpired = (token) => {
    try {
        const decoded = decodeToken(token, process.env.JWT_SECRET);
        return decoded.exp < Date.now() / 1000;
    } catch (e) {
        return false;
    }
};

