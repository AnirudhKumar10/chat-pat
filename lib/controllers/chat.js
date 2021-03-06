"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessage = undefined;

var _message = require("../models/message");

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
export const addMessage = (req, res) => {
  let message = new Message({
    msg: req.body.msg,
    sender_id: req.body.sender_id,
    rcv_id: req.body.rcv_id,
  });
  message
    .save()
    .then(() => {
      res.status(200).json({ report: "Message Send" });
    })
    .catch((err) => {
      res.status(400).json({ report: "Message Failed" });
    });
};
*/

var getMessage = exports.getMessage = function getMessage(req, res) {
  _message2.default.find({
    $and: [{ sender_id: { $in: [req.body.sender_id, req.params.rcv_id] } }, { rcv_id: { $in: [req.params.rcv_id, req.body.sender_id] } }]
  }).then(function (msg) {
    res.status(200).json({ msg: msg });
  }).catch(function (err) {
    res.status(400).json({ err: err });
  });
};