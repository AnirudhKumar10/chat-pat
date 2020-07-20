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

let server = http.Server(app);
let io = new SocketIO(server);
const port = process.env.PORT || 4000;

// CONNECT TO DATABASE
//mongoose.connect(config.localUrl, { useNewUrlParser: true });
mongoose.connect(config.remoteUrl, { useNewUrlParser: true });
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
app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

server.listen(port, () => {
  console.log(`Server started at : ${port}`);
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
