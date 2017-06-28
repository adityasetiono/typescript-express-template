import { models } from '../../models/index';
import { UserInstance } from '../../models/user';

export const getUsers = async (
  socket: SocketIO.Socket,
  req: CustomRoute.SocketRequest
) => {
  const users: UserInstance[] = await models.User.findAll();
  const u = users.map(user => user.toJSON());
  socket.emit('GET', { users: u });
};
