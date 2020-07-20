"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _user = require("./routes/user");

var _user2 = _interopRequireDefault(_user);

var _message = require("./routes/message");

var _message2 = _interopRequireDefault(_message);

var _database = require("./configs/database");

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();


var server = _http2.default.Server(app);
var io = new _socket2.default(server);
var port = process.env.PORT || 4000;

// CONNECT TO DATABASE
//mongoose.connect(config.localUrl, { useNewUrlParser: true });
_mongoose2.default.connect(_database2.default.remoteUrl, { useNewUrlParser: true });
_mongoose2.default.connection.once("open", function () {
  console.log("Database Connection made Successfully.");
});
_mongoose2.default.connection.on("err", function () {
  console.log(err);
});

// MIDDLEWARE
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use((0, _cors2.default)());

// SET STATIC FOLDER
app.use(_express2.default.static(_path2.default.join(__dirname, "public")));

// ROUTES
app.use("/api/users", _user2.default);
app.use("/api/messages", _message2.default);

// INDEX ROUTES
app.get("/", function (req, res) {
  res.send("invaild endpoint");
});

app.get("*", function (req, res) {
  res.sendFile(_path2.default.join(__dirname, "public/index.html"));
});

server.listen(port, function () {
  console.log("Server started at : " + port);
});

/*
io.on("connection", (socket) => {
  console.log("A user connected" + socket.id);

  socket.join("room");
  io.sockets.in("room").emit("connectToRoom", "You are in room");

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
*/