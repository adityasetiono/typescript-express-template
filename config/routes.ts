import * as express from 'express';
import index from '../src/controllers/index';
import user from '../src/controllers/user';
import security from '../src/controllers/security';

export interface IRoute {
  prefix: string;
  router: express.Router;
}

export class Route implements IRoute {
  prefix: string;
  router: express.Router;
  constructor(prefix, router) {
    this.prefix = prefix;
    this.router = router;
  }
}

export const routes:Array<Route> = [
  (new Route('/', index)),
  (new Route('/api/users', user)),
  (new Route('/api', security))
];
