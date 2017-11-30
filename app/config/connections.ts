const local: CustomConfig.IConfig = {
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

const develop: CustomConfig.IConfig = {
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

const staging: CustomConfig.IConfig = {
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

const production: CustomConfig.IConfig = {
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
