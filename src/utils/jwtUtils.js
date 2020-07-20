import jwt from 'jsonwebtoken'
import AppConfig from "../config/AppConfig";

const decodeToken = (Token) => {
    return jwt.decode(Token, AppConfig.jwtSecret);
};

export const freshToken = (formData, timeDuration) => {
    return jwt.sign(
        formData,
        AppConfig.jwtSecret,
        {
            expiresIn: timeDuration,
        }
    );
};

export const isTokenExpired = (token) => {
    try {
        const decoded = decodeToken(token, AppConfig.jwtSecret);
        return decoded.exp < Date.now() / 1000;
    } catch (e) {
        return false;
    }
};

