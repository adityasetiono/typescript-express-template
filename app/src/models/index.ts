import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { config } from 'config/connections';
import * as logger from 'morgan';
import { UserAttribute, UserInstance, user } from 'src/models/user';
const env: string = process.env.NODE_ENV || 'local';

export interface SequelizeModels {
  User: Sequelize.Model<UserInstance, UserAttribute>;
}

class Database {
  private _basename: string;
  private _models: SequelizeModels;
  private _sequelize: Sequelize.Sequelize;

  constructor() {
    this._basename = path.basename(__filename);
    const dbConfig: CustomConfig.IDatabaseConfig = config[env].database;

    this._sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      dbConfig
    );
    this._models = {} as any;

    const models = [user];
    models.forEach(model => {
      const m = model(this._sequelize, Sequelize);
      this._models[(m as any).name] = m;
    });

    Object.keys(this._models).forEach((modelName: string) => {
      if (typeof this._models[modelName].associate === 'function') {
        this._models[modelName].associate(this._models);
      }
    });
  }

  getModels() {
    return this._models;
  }

  getSequelize() {
    return this._sequelize;
  }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();
