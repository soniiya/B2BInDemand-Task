import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const jwt_secret = process.env.JWT_SECRET;
export const issueTokenAndSetCookie = (res, payload) => {
    if (!jwt_secret)
        throw "jwt token not present";
    const token = jwt.sign(payload, jwt_secret, { expiresIn: '1h' });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
    });
    return token;
};
export const verifyToken = (token) => {
    if (!jwt_secret)
        throw "jwt token not present";
    try {
        return jwt.verify(token, jwt_secret);
    }
    catch (err) {
        return null;
    }
};
