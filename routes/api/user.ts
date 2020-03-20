import express from 'express';
// @ts-ignore squash JSON compiler warning
import users from '../../mocks/users.json';
import roles from '../../mocks/roles.json';


export const userRoute: express.Handler = (_req: any, res) => {
    const filteredUser = users.filter(user => user.id === parseInt(_req.params.id));
    const filteredRoles =  roles.filter(role => role.userId === parseInt(_req.params.id));
    let role: string = filteredRoles[0].role;
    let user = role === 'ADMIN' ?  users : filteredUser
    
    res.status(200).json(user);
};
