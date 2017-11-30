import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as auth from 'src/middlewares/auth';
import { routes } from 'config/routes';

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
    this.express.use('/api', auth.authenticate);
  }

  private routes(): void {
    routes.forEach(route => this.express.use(route.prefix, route.router));
  }
}

export default new App().express;
