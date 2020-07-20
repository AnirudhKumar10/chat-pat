import express from "express";
import {
  login,
  register,
  updateUserById,
  deleteUserById,
  getAllUser,
  getUserById,
} from "../controllers/user";
import { chechAuth, checkAuth } from "../middlewares/check-auth";

const route = express.Router();

route.post("/login", login);

route.post("/register", register);

route.put("/update/:id", checkAuth, updateUserById);

route.delete("/delete/:id", checkAuth, deleteUserById);

route.post("/", checkAuth, getAllUser);

route.post("/id", checkAuth, getUserById);

export default route;
