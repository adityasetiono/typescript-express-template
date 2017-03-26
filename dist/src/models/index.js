"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var connections_1 = require("../../config/connections");
var env = process.env.NODE_ENV || 'local';
var Database = (function () {
    function Database() {
        var _this = this;
        this._basename = path.basename(__filename);
        var dbConfig = connections_1.databaseConfig[env];
        this._sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
        this._models = {};
        fs.readdirSync(__dirname).filter(function (file) {
            return (file !== _this._basename) && (file !== "interfaces");
        }).forEach(function (file) {
            var model = _this._sequelize.import(path.join(__dirname, file));
            _this._models[model.name] = model;
        });
        Object.keys(this._models).forEach(function (modelName) {
            if (typeof _this._models[modelName].associate === "function") {
                _this._models[modelName].associate(_this._models);
            }
        });
    }
    Database.prototype.getModels = function () {
        return this._models;
    };
    Database.prototype.getSequelize = function () {
        return this._sequelize;
    };
    return Database;
}());
var database = new Database();
exports.models = database.getModels();
exports.sequelize = database.getSequelize();
