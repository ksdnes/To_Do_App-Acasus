import express from "express";
import { verifyToken } from "../helpers";
import { User } from "../types/types";
import { getUserByToken } from "../db/users";
import { getRunningTrackById } from "../db/runningTracks";

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
export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user?.id;
    if (!currentUserId || currentUserId.toString() !== id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(403).json({ message: "Authorization failed" });
  }
};

export const checkOwnership = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userId = req.user?.id;
  const { id } = req.params;
  try {
    const runningTrack = await getRunningTrackById(id);
    if (!runningTrack) {
      return res.status(404).json({ message: "Running track not found" });
    }
    if (runningTrack.user.toString() !== userId?.toString()) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not own this running track" });
    }
    next();
  } catch (error) {
    console.error("Error checking ownership:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
