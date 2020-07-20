"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _user = require("../controllers/user");

var _checkAuth = require("../middlewares/check-auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = _express2.default.Router();

route.post("/login", _user.login);

route.post("/register", _user.register);

route.put("/update/:id", _checkAuth.checkAuth, _user.updateUserById);

route.delete("/delete/:id", _checkAuth.checkAuth, _user.deleteUserById);

route.post("/", _checkAuth.checkAuth, _user.getAllUser);

route.post("/id", _checkAuth.checkAuth, _user.getUserById);

exports.default = route;