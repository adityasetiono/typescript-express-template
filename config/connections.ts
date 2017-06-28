export interface IDatabaseConfig {
  host: string;
  username: string;
  password: string;
  dialect: string;
  database: string;
  port: number;
}

export interface IRedisConfig {
  host: string;
  port: number;
}

export interface IConfig {
  database: IDatabaseConfig;
  redis: IRedisConfig;
}

const local: IConfig = {
  database: {
    host: 'mysql',
    username: 'root',
    password: 'password',
    dialect: 'mysql',
    database: 'template',
    port: 3306
  },
  redis: {
    host: 'redis',
    port: 6379
  }
};

const develop: IConfig = {
  database: {
    host: 'mysql',
    username: 'root',
    password: 'password',
    dialect: 'mysql',
    database: 'template',
    port: 3306
  },
  redis: {
    host: 'redis',
    port: 6379
  }
};

const staging: IConfig = {
  database: {
    host: 'mysql',
    username: 'root',
    password: 'password',
    dialect: 'mysql',
    database: 'template',
    port: 3306
  },
  redis: {
    host: 'redis',
    port: 6379
  }
};

const production: IConfig = {
  database: {
    host: 'mysql',
    username: 'root',
    password: 'password',
    dialect: 'mysql',
    database: 'template',
    port: 3306
  },
  redis: {
    host: 'redis',
    port: 6379
  }
};

export const config = {
  local,
  develop,
  staging,
  production
};
