"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var local = {
    host: 'mysql',
    username: 'root',
    password: 'password',
    dialect: 'mysql',
    database: 'template',
    port: 3306
};
var develop = {
    host: 'mysql',
    username: 'root',
    password: 'password',
    dialect: 'mysql',
    database: 'template',
    port: 3306
};
var staging = {
    host: 'mysql',
    username: 'root',
    password: 'password',
    dialect: 'mysql',
    database: 'template',
    port: 3306
};
var production = {
    host: 'mysql',
    username: 'root',
    password: 'password',
    dialect: 'mysql',
    database: 'template',
    port: 3306
};
exports.databaseConfig = {
    local: local,
    develop: develop,
    staging: staging,
    production: production
};
