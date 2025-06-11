import pkg from 'jsonwebtoken';
const { sign } = pkg;

export function signAccessToken(id) {
    return sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXP })
}

export function signRefreshToken(id) {
    return sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXP })
}