import express from "express";
import { getAllUsers, updateUser } from "../controllers/users";
import { authenticateToken, isOwner } from "../middlewares";
export default (router: express.Router) => {
  router.get("/users", authenticateToken, getAllUsers);
  router.patch("/users/:id", authenticateToken, isOwner, updateUser);
};
