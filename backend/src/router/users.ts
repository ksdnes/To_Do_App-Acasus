import express from "express";
import { getAllUsers, updateUser, getOneUser } from "../controllers/users";
import { authenticateToken, isOwner } from "../middlewares";
export default (router: express.Router) => {
  router.get("/users", authenticateToken, getAllUsers);
  router.get("/users/:id", authenticateToken, isOwner, getOneUser);
  router.patch("/users/:id", authenticateToken, isOwner, updateUser);
};
