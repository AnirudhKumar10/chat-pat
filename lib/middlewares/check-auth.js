"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuth = undefined;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkAuth = exports.checkAuth = function checkAuth(req, res, next) {
  try {
    var token = req.headers.authorization;
    var decoded = _jsonwebtoken2.default.verify(token, "secret");
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Auth Failed" });
  }
};