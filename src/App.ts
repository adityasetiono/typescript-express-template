import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as auth from './middlewares/auth';
import { IRoute, routes } from '../config/routes';


class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(auth.authenticate);
  }

  private routes(): void {
    routes.forEach((route: IRoute) => this.express.use(route.prefix, route.router));
  }
}

export default new App().express;