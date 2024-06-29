import express from "express";
import {
  getAllRunningTracks,
  getRunningTrack,
  createRunningTrackHandler,
  updateRunningTrack,
  deleteRunningTrack,
} from "../controllers/runningTracks";
import { authenticateToken, isOwner } from "../middlewares";
export default (router: express.Router) => {
  // GET all running tracks (accessible to everyone)
  router.get("/running-tracks", authenticateToken, getAllRunningTracks);

  // GET a running track by ID (accessible to everyone)
  router.get("/running-tracks/:id", authenticateToken, getRunningTrack);

  // POST a new running track (accessible to everyone)
  router.post("/running-tracks", authenticateToken, createRunningTrackHandler);

  // PUT/update a running track by ID (only accessible to track owner)
  router.patch(
    "/running-tracks/:id",
    authenticateToken,
    isOwner,
    updateRunningTrack
  );

  // DELETE a running track by ID (only accessible to track owner)
  router.delete(
    "/running-tracks/:id",
    authenticateToken,
    isOwner,
    deleteRunningTrack
  );
};
