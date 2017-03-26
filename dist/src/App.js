"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var auth = require("./middlewares/auth");
var routes_1 = require("../config/routes");
var App = (function () {
    function App() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    App.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(auth.authenticate);
    };
    App.prototype.routes = function () {
        var _this = this;
        routes_1.routes.forEach(function (route) { return _this.express.use(route.prefix, route.router); });
    };
    return App;
}());
exports.default = new App().express;
