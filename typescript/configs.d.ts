declare namespace CustomConfig {
  export interface IRedisConfig {
    host: string;
    port: number;
  }

  export interface IDatabaseConfig {
    host: string;
    username: string;
    password: string;
    dialect: string;
    database: string;
    port: number;
  }

  export interface IConfig {
    database: IDatabaseConfig;
    redis: IRedisConfig;
  }
}
