import express from "express";
import {
  getAllRunningTracks,
  getRunningTrack,
  createRunningTrackHandler,
  updateRunningTrack,
  deleteRunningTrack,
  getAllRunningTracksByUserId,
  getAllCompletedRunningTracksByUserId,
} from "../controllers/runningTracks";
import { authenticateToken, isOwner, checkOwnership } from "../middlewares";
export default (router: express.Router) => {
  // GET all running tracks (accessible to everyone)
  router.get("/running-tracks", authenticateToken, getAllRunningTracks);

  // GET a running track by ID (accessible to everyone)
  router.get("/running-tracks/:id", authenticateToken, getRunningTrack);
  router.get(
    "/running-tracks/user/:id",
    authenticateToken,
    isOwner,
    getAllRunningTracksByUserId
  );
  //GET the running tracks by ID , but only those which are Completed
  router.get(
    "/running-tracks/user/:id/completed",
    authenticateToken,
    isOwner,
    getAllCompletedRunningTracksByUserId
  );

  // POST a new running track (accessible to everyone)
  router.post("/running-tracks", authenticateToken, createRunningTrackHandler);

  // PUT/update a running track by ID (only accessible to track owner)
  router.patch(
    "/running-tracks/:id",
    authenticateToken,
    checkOwnership,
    updateRunningTrack
  );

  // DELETE a running track by ID (only accessible to track owner)
  router.delete(
    "/running-tracks/:id",
    authenticateToken,
    checkOwnership,
    deleteRunningTrack
  );
};
