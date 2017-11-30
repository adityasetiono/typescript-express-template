import * as jwt from 'jsonwebtoken';
import { secret } from 'config/keys';
import { socketRoutes } from 'config/routes';
import * as RouteParser from 'route-parser';
import { publicUris } from 'config/routes';

export function parseRoute(socket: any, next: Function) {
  Object.keys(socketRoutes).forEach(key => {
    const route = new RouteParser(key);
    const params = route.match(socket[1].url);
    if (params) {
      socket[0] = key;
      socket[1].params = params;
    }
  });
  next();
}

export function authenticate(socket: any, next: Function) {
  let authenticated: boolean = false;
  publicUris.forEach(uri => {
    const route = new RouteParser(uri);
    const stat = route.match(socket[1].url);
    if (stat !== false) {
      authenticated = true;
    }
  });
  if (!authenticated) {
    const token = socket[1].headers.authToken;
    try {
      const decoded = jwt.decode(token);
      const status = jwt.verify(token, secret[decoded['n']]);
    } catch (err) {
      authenticated = false;
      socket[1].client.emit('test', {
        status: 401,
        message: 'You are not authenticated.'
      });
      socket[1].client.disconnect();
      return;
    }
  }
  next();
}
