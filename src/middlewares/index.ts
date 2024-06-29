import express from "express";
import { verifyToken } from "../helpers";
import { User } from "../types/types";
import { getUserByToken } from "../db/users";

export const authenticateToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const accessToken = req.cookies["accessToken"];

  if (!accessToken) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  try {
    const decodedUser = verifyToken(accessToken) as User;
    if (!decodedUser) {
      return res.status(401).json({
        message: "The token verification failed",
      });
    }
    const existingUser = await getUserByToken(accessToken);
    if (!existingUser) {
      console.log("there is not existing user with this Token");
      return res.sendStatus(403);
    }

    req.user = decodedUser;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};
