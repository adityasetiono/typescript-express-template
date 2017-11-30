/// <reference types="express-serve-static-core" />

declare namespace CustomRoute {
  export interface IRoute {
    prefix: string;
    router?: any;
  }

  export interface ISocketRoute {
    [event: string]: SocketAction;
  }

  export interface SocketRequest {
    method: string;
    url: string;
    params?: any;
    header?: any;
    body?: any;
    query?: any;
  }

  export interface SocketAction extends Function {
    (socket: SocketIO.Socket, req: SocketRequest): void;
  }
}
