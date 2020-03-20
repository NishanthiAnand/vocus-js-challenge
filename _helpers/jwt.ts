import expressJwt from 'express-jwt';
// @ts-ignore squash JSON compiler warning
import config from '../config.json';

export default function jwt() {
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/api/login'
        ]
    });
}