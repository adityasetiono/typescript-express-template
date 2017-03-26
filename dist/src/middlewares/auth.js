"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var keys_1 = require("../../config/keys");
var publicUris = [
    '/',
    '/api/login'
];
function authenticate(req, res, next) {
    if (!publicUris.find(function (uri) { return uri === req.url; })) {
        var token = req.headers.authtoken;
        try {
            var decoded = jwt.decode(token);
            var status = jwt.verify(token, keys_1.secret[decoded.n]);
        }
        catch (err) {
            res.status(401).json({ message: "You are not authenticated." });
        }
    }
    next();
}
exports.authenticate = authenticate;
