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

var _checkAuth = require("./middlewares/check-auth");

var _message3 = require("./models/message");

var _message4 = _interopRequireDefault(_message3);

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
//app.get("/", (req, res) => {
//  res.send("invaild endpoint");
//});

//app.get("*", (req, res) => {
//  res.sendFile(path.join(__dirname, "public/index.html"));
//});

server.listen(port, function () {
  console.log("Server started at : " + port);
});

io.on("connection", function (socket) {
  console.log("A user connected" + socket.id);

  app.post("/api/messages/", _checkAuth.checkAuth, function (req, res, next) {
    var message = new _message4.default({
      msg: req.body.msg,
      sender_id: req.body.sender_id,
      rcv_id: req.body.rcv_id
    });

    io.emit("msg", message);
    message.save().then(function () {
      res.status(200).json({ report: "Message Send" });
    }).catch(function (err) {
      res.status(400).json({ report: "Message Failed" });
    });
  });

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});