import express from "express";
import { checkAuth } from "../middlewares/check-auth";
import { addMessage, getMessage } from "../controllers/chat";

const route = express.Router();

route.post("/", checkAuth, addMessage);

route.post("/:rcv_id", checkAuth, getMessage);

export default route;
