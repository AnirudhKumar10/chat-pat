"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUser = exports.register = exports.login = undefined;

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = exports.login = function login(req, res, next) {
  _user2.default.find({
    $or: [{ email: req.body.userid }, { user_id: req.body.userid }]
  }).then(function (user) {
    if (user.length === 1) {
      _bcrypt2.default.compare(req.body.password, user[0].password).then(function (result) {
        if (result) {
          var token = _jsonwebtoken2.default.sign({ email: user[0].email, userId: user[0]._id }, "secret");
          res.status(200).json({
            message: "Auth Successfull",
            _Id: user[0]._id,
            userEmailL: user[0].email,
            user_ID: user[0].user_id,
            friends: user[0].friends,
            token: token
          });
        } else {
          res.status(404).json({
            message: "Auth Failed."
          });
        }
      });
    } else {
      res.status(404).json({
        message: "Email not found."
      });
    }
  });
};

var register = exports.register = function register(req, res, next) {
  _user2.default.find({ email: req.body.email, user_id: req.body.user_id }).then(function (user) {
    if (user.length >= 1) {
      res.status(409).json({ message: "User already exits." });
    } else {
      _bcrypt2.default.hash(req.body.password, 10).then(function (hash) {
        user = new _user2.default({
          name: req.body.name,
          user_id: req.body.user_id,
          email: req.body.email,
          password: hash
        });
        user.save().then(function () {
          res.status(201).json({ message: "User was successfully created." });
        });
      }).catch(function () {
        res.status(201).json({ message: "Error while creating record." });
      });
    }
  });
};

var getAllUser = exports.getAllUser = function getAllUser(req, res, next) {
  _user2.default.find({}).then(function (users) {
    users = users.filter(function (user) {
      return user._id != req.body.userid;
    });
    res.status(200).json({ users: users });
  }).catch(function (err) {
    res.status(400).json({ err: err });
  });
};

var getUserById = exports.getUserById = function getUserById(req, res, next) {
  _user2.default.find({ user_id: req.body.user_id }).then(function (user) {
    res.status(200).json({ name: user[0].name, id: user[0]._id });
  }).catch(function (err) {
    res.status(400).json({ err: err });
  });
};

var updateUserById = exports.updateUserById = function updateUserById(req, res, next) {
  _user2.default.findOneAndUpdate(req.params.id, req.body).then(function (user) {
    res.status(200).json({ user: user });
  }).catch(function (err) {
    res.status(404).json({ message: "There was error updating." });
  });
};

var deleteUserById = exports.deleteUserById = function deleteUserById(req, res, next) {
  _user2.default.findOneAndRemove({ _id: req.params.id }).then(function (user) {
    res.status(200).json({ user: user });
  }).catch(function (err) {
    res.status(404).json({ message: "There was error deleting." });
  });
};