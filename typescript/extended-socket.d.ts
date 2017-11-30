declare namespace SocketIO {
  interface Namespace extends NodeJS.EventEmitter {}
  export interface Socket {
    use(fn: (socket: Socket, fn: (err?: any) => void) => void): Namespace;
  }
}
