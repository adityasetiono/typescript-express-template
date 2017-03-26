import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { secret } from '../../config/keys';
import * as Sequelize from 'sequelize';

export interface UserAttribute {
  id: string;
  username: string;
  name: string;
  password: string;
  email: string;
  generateToken(): string;
}

export interface UserInstance extends Sequelize.Instance<UserAttribute>, UserAttribute { }

export interface UserModel extends Sequelize.Model<UserInstance, UserAttribute> { }

export default function (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttribute> {
  let User = sequelize.define<UserInstance, UserAttribute>("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      hooks: {
        beforeCreate: async function (user, options, cb) {
          console.log("beforeCreate");
          const hash: string = await bcrypt.hash(user.password, 8);
          user.password = hash;
          return cb(null, options);
        }
      },
      instanceMethods: {
        generateToken: async function() {
          const time = new Date().getTime() / 1000;
          const n = Math.floor(Math.random() * 20);
          const jwtBody = {
            id: this.id,
            username: this.username,
            email: this.email,
            iat: time,
            exp: time + (7 * 24 * 60 * 60),
            nbf: time,
            n: n
          };
          const token:string = await jwt.sign(jwtBody, secret[n], null);
          return token;
        },
        toJSON: function() {
          const values = Object.assign({}, this.get());
          delete values.password;
          return values;
        }
      }
    });
  return User;
}