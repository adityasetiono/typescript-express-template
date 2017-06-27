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
}

export interface UserInstance extends Sequelize.Instance<
  UserAttribute
>, UserAttribute {
  generateToken?: any;
}

export interface UserModel extends Sequelize.Model<
  UserInstance,
  UserAttribute
> {
  prototype?: any;
}

export default function(
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<UserInstance, UserAttribute> {
  let User: UserModel = sequelize.define<UserInstance, UserAttribute>(
    'User',
    {
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
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    },
    {
      tableName: 'user',
      timestamps: true,
      hooks: {
        beforeCreate: async function(user) {
          const hash: string = await bcrypt.hash(user.password, 8);
          user.password = hash;
        }
      }
    }
  );
  User.prototype.generateToken = async function() {
    const time = new Date().getTime() / 1000;
    const n = Math.floor(Math.random() * 20);
    const jwtBody = {
      id: this.id,
      username: this.username,
      email: this.email,
      iat: time,
      exp: time + 7 * 24 * 60 * 60,
      nbf: time,
      n: n
    };
    const token: string = await jwt.sign(jwtBody, secret[n], null);
    return token;
  };
  User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };
  return User;
}
