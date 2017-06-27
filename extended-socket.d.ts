declare namespace SocketIO {
  export interface Socket {
    use(fn: (socket: Socket, fn: (err?: any) => void) => void): Namespace;
  }
}
