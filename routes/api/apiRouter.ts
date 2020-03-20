import express from 'express';
import { permissionsRoute } from './permissions';
import { rolesRoute } from './roles';
import { usersRoute } from './users';
import { userRoute } from './user';
import { auth, tokenRefresh } from './auth';


export const apiRouter = express.Router();

apiRouter.post('/login', auth)
apiRouter.post('/tokenRefresh', tokenRefresh);
apiRouter.get('/permissions/:id', permissionsRoute);
apiRouter.get('/roles', rolesRoute);
apiRouter.get('/users', usersRoute);
apiRouter.get('/users/:id', userRoute);
