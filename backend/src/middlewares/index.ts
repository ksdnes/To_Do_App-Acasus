import express from "express";
import { verifyToken } from "../helpers";
import { User } from "../types/types";
import { getUserByToken, getUserById } from "../db/users";
import { getRunningTrackById } from "../db/runningTracks";

export const authenticateToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers["authorization"];
  console.log("authHeader" + authHeader);
  if (!authHeader) {
    return res.status(401).json({ message: "Authentication failed heree" });
  }
  const token = authHeader; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "Authentication failed 2" });
  }

  try {
    const decodedToken = verifyToken(token.toString());
    console.log("decodedToken1", decodedToken);

    if (typeof decodedToken === "string" || !decodedToken) {
      return res.status(401).json({ message: "Token verification failed" });
    }

    const { id } = decodedToken;
    console.log("decodedToken1", decodedToken);
    const existingUser = await getUserById(id);
    if (!existingUser) {
      console.log("No existing user with this token");
      return res.sendStatus(403);
    }

    req.user = existingUser as User; // Cast existingUser to User interface
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Authentication failed2" });
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
