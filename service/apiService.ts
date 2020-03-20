import config from '../config.json';
import jwt from 'jsonwebtoken';
// @ts-ignore squash JSON compiler warning
import users from '../mocks/users.json';
import roles from '../mocks/roles.json';
import permissions from '../mocks/permissions.json';

const tokenList: any = {};

export async function authenticate(email: String): Promise<any> {
    const user = users.find((u) => u.email === email);
    if (user) {
        const role = roles.filter(role => role.userId === user.id);
        const token = jwt.sign({ 
            sub: user.id , 
            email: user.email, 
            role: role.length === 1 ? role[0] : permissions.GUEST}, 
            config.secret, 
            { expiresIn: config.refreshTokenLife});
        const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife});
        const response = {
                            token,
                            refreshToken
                        };
        tokenList[refreshToken] = response;
        return response;
    }
}

export async function token(email:string, refreshToken:string): Promise<any> {
    const user = users.find((u) => u.email === email);
    if(user && (refreshToken) && (refreshToken in tokenList)) {
        const role = roles.filter(role => role.userId === user.id);
        const token = jwt.sign({ 
            sub: user.id , 
            email: user.email, 
            role: role.length === 1 ? role[0] : permissions.GUEST}, 
            config.secret, 
            { expiresIn: config.refreshTokenLife});
        // update the token in the list
        tokenList[refreshToken].token = token
        return {
            token
        };      
    }
}