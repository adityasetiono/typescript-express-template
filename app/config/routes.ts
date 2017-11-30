import * as express from 'express';
import index from 'src/controllers/index';
import user from 'src/controllers/user';
import security from 'src/controllers/security';
import { getUsers, getUser } from 'src/sockets/io/user';

export const routes: Array<CustomRoute.IRoute> = [
  { prefix: '/', router: index },
  { prefix: '/api/users', router: user },
  { prefix: '/api', router: security }
];

export const socketRoutes: CustomRoute.ISocketRoute = {
  '/api/users': getUsers,
  '/api/users/:id': getUser
};

export const publicUris: Array<string> = ['/login'];
