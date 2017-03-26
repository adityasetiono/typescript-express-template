"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/controllers/index");
var user_1 = require("../src/controllers/user");
var security_1 = require("../src/controllers/security");
var Route = (function () {
    function Route(prefix, router) {
        this.prefix = prefix;
        this.router = router;
    }
    return Route;
}());
exports.Route = Route;
exports.routes = [
    (new Route('/', index_1.default)),
    (new Route('/api/users', user_1.default)),
    (new Route('/api', security_1.default))
];
