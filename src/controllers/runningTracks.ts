import express from "express";
import {
  createRunningTrack,
  deleteRunningTrackById,
  getRunningTrackById,
  getRunningTracks,
  updateRunningTrackById,
} from "../db/runningTracks";
import {
  CreateRunningTrackInput,
  UpdateRunningTrackInput,
} from "../types/types";

// GET all running tracks
export const getAllRunningTracks = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const runningTracks = await getRunningTracks();
    return res.status(200).json(runningTracks);
  } catch (error) {
    console.error("Error fetching running tracks:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET a running track by ID
export const getRunningTrack = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  try {
    const runningTrack = await getRunningTrackById(id);
    console.log(runningTrack);
    if (!runningTrack) {
      return res.status(404).json({ message: "Running track not found" });
    }
    return res.status(200).json(runningTrack);
  } catch (error) {
    console.error("Error fetching running track:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// CREATE a new running track
export const createRunningTrackHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, location, distance, estimatedDuration, dateTime } = req.body;
  const newRunningTrack: CreateRunningTrackInput = {
    name,
    location,
    distance,
    estimatedDuration,
    dateTime,
  };
  console.log(newRunningTrack);
  try {
    const createdRunningTrack = await createRunningTrack(newRunningTrack);
    res.status(201).json(createdRunningTrack);
  } catch (error) {
    console.error("Error creating running track:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE a running track by ID
export const updateRunningTrack = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const { name, location, distance, estimatedDuration, dateTime } = req.body;
  const updatedRunningTrack: UpdateRunningTrackInput = {
    name,
    location,
    distance,
    estimatedDuration,
    dateTime,
  };
  try {
    const updatedTrack = await updateRunningTrackById(id, updatedRunningTrack);
    if (!updatedTrack) {
      return res.status(404).json({ message: "Running track not found" });
    }
    res.json(updatedTrack);
  } catch (error) {
    console.error("Error updating running track:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE a running track by ID
export const deleteRunningTrack = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  try {
    const deletedTrack = await deleteRunningTrackById(id);
    if (!deletedTrack) {
      return res.status(404).json({ message: "Running track not found" });
    }
    res.json({ message: "Running track deleted successfully" });
  } catch (error) {
    console.error("Error deleting running track:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
