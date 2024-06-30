import express from "express";
import authentication from "./authentication";
import users from "./users";
import runningTracks from "./runningTracks";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  runningTracks(router);
  return router;
};
