"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var messageSchema = new Schema({
  msg: { type: String, required: true },
  sender_id: { type: Schema.Types.ObjectId, required: true },
  rcv_id: { type: Schema.Types.ObjectId, required: true },
  time: { type: Date, default: Date.now }
});

exports.default = _mongoose2.default.model("Message", messageSchema, "messages");