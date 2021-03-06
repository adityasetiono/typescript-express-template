import * as http from 'http';
import * as debug from 'debug';
import { sequelize } from 'src/models/index';
import io from 'src/sockets/io';

import App from 'src/App';

debug('ts-express:server');

const PORT = normalizePort(process.env.PORT || 3000);
App.set('port', PORT);

const server = http.createServer(App);
sequelize.sync().then(() => {
  server.listen(PORT);
  server.on('error', onError);
  io(server, { transports: ['websocket'] });
  server.on('listening', onListening);
});

function normalizePort(val: number | string): number | string | boolean {
  let port: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
