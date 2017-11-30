import { models } from 'src/models/index';
import { UserInstance } from 'src/models/user';

export const getUsers = async (
  socket: SocketIO.Socket,
  req: CustomRoute.SocketRequest
) => {
  const users: UserInstance[] = await models.User.findAll();
  const u = users.map(user => user.toJSON());
  socket.emit('GET', { users: u });
};

export const getUser = async (
  socket: SocketIO.Socket,
  req: CustomRoute.SocketRequest
) => {
  const user = await models.User.findById(req.params.id);
  const response = user ? user.toJSON : 'NOT FOUND';
  socket.emit('GET', { user: response });
};
