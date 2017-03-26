"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var keys_1 = require("../../config/keys");
function default_1(sequelize, DataTypes) {
    var User = sequelize.define("User", {
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
            beforeCreate: function (user, options, cb) {
                return __awaiter(this, void 0, void 0, function () {
                    var hash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("beforeCreate");
                                return [4 /*yield*/, bcrypt.hash(user.password, 8)];
                            case 1:
                                hash = _a.sent();
                                user.password = hash;
                                return [2 /*return*/, cb(null, options)];
                        }
                    });
                });
            }
        },
        instanceMethods: {
            generateToken: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var time, n, jwtBody, token;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                time = new Date().getTime() / 1000;
                                n = Math.floor(Math.random() * 20);
                                jwtBody = {
                                    id: this.id,
                                    username: this.username,
                                    email: this.email,
                                    iat: time,
                                    exp: time + (7 * 24 * 60 * 60),
                                    nbf: time,
                                    n: n
                                };
                                return [4 /*yield*/, jwt.sign(jwtBody, keys_1.secret[n], null)];
                            case 1:
                                token = _a.sent();
                                return [2 /*return*/, token];
                        }
                    });
                });
            },
            toJSON: function () {
                var values = Object.assign({}, this.get());
                delete values.password;
                return values;
            }
        }
    });
    return User;
}
exports.default = default_1;
