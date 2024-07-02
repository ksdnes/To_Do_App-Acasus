import { Request } from "express";
import mongoose, { Document } from "mongoose";

declare module "express" {
  interface Request {
    user?: User;
  }
}

export interface User {
  id: string;
  username: string;
  email: string;
  authentication: {
    password: string;
    salt?: string;
  };
}

//comment RUNNING
export interface RunningTrack {
  name: string;
  location: string;
  distance: Date;
  estimatedDuration: number;
  dateTime: Date;
  user: mongoose.Types.ObjectId;
}

export interface RunningTrackDocument extends RunningTrack, Document {}

export interface CreateRunningTrackInput {
  name: string;
  location: string;
  distance: Date;
  isCompleted: boolean;
  estimatedDuration: number;
  dateTime: Date;
}

export interface UpdateRunningTrackInput {
  name?: string;
  location?: string;
  distance?: Date;
  isCompleted: boolean;
  estimatedDuration?: number;
  dateTime?: Date;
}
