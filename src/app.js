import express from "express";
const app = express();
import path from "path";
import http from "http";
import SocketIO from "socket.io";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user";
import messageRoute from "./routes/message";
import config from "./configs/database";
import { checkAuth } from "./middlewares/check-auth";
import Message from "./models/message";

let server = http.Server(app);
let io = new SocketIO(server);
const port = process.env.PORT || 4000;

// CONNECT TO DATABASE

/** 
 * Use this if you want to use remote url
 * mongoose.connect(config.remoteUrl, { useNewUrlParser: true });
 */

/** 
 * Use this if you want to use remote url
 * mongoose.connect(config.localUrl, { useNewUrlParser: true });
 */
mongoose.connection.once("open", () => {
  console.log("Database Connection made Successfully.");
});
mongoose.connection.on("err", () => {
  console.log(err);
});

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/api/users", userRoute);
app.use("/api/messages", messageRoute);

// INDEX ROUTES
//app.get("/", (req, res) => {
//  res.send("invaild endpoint");
//});

//app.get("*", (req, res) => {
//  res.sendFile(path.join(__dirname, "public/index.html"));
//});

server.listen(port, () => {
  console.log(`Server started at : ${port}`);
});

io.on("connection", (socket) => {
  console.log("A user connected" + socket.id);

  app.post("/api/messages/", checkAuth, (req, res, next) => {
    let message = new Message({
      msg: req.body.msg,
      sender_id: req.body.sender_id,
      rcv_id: req.body.rcv_id,
    });

    io.emit("msg", message);
    message
      .save()
      .then(() => {
        res.status(200).json({ report: "Message Send" });
      })
      .catch((err) => {
        res.status(400).json({ report: "Message Failed" });
      });
  });

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
