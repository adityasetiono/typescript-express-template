import { authenticate, parseRoute } from '../../middlewares/socket';
import * as http from 'http';
import * as socketio from 'socket.io';
import { socketRoutes } from '../../../config/routes';

export default function(server: http.Server, options: object): SocketIO.Server {
  const io = socketio(server, options);
  io.on('connection', client => {
    console.log('a client connected');
    client.use((socket: SocketIO.Socket, next) => {
      socket[1].client = client;
      next();
    });
    client.use(authenticate);
    client.use(parseRoute);
    Object.keys(socketRoutes).forEach(key =>
      client.on(key, (data: CustomRoute.SocketRequest) =>
        socketRoutes[key](client, data)
      )
    );
  });
  return io;
}
