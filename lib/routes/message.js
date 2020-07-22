"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _checkAuth = require("../middlewares/check-auth");

var _chat = require("../controllers/chat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = _express2.default.Router();

//route.post("/", checkAuth, addMessage);

route.post("/:rcv_id", _checkAuth.checkAuth, _chat.getMessage);

exports.default = route;