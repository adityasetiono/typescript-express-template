export interface IDatabaseConfig {
  host: string;
  username: string;
  password: string;
  dialect: string;
  database: string;
  port: number;
}

const local: IDatabaseConfig = {
  host: 'mysql',
  username: 'root',
  password: 'password',
  dialect: 'mysql',
  database: 'template',
  port: 3306
};

const develop: IDatabaseConfig = {
  host: 'mysql',
  username: 'root',
  password: 'password',
  dialect: 'mysql',
  database: 'template',
  port: 3306
};

const staging: IDatabaseConfig = {
  host: 'mysql',
  username: 'root',
  password: 'password',
  dialect: 'mysql',
  database: 'template',
  port: 3306
};

const production: IDatabaseConfig = {
  host: 'mysql',
  username: 'root',
  password: 'password',
  dialect: 'mysql',
  database: 'template',
  port: 3306
};

export const databaseConfig = {
  local,
  develop,
  staging,
  production
};
