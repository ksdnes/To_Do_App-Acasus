import express from "express";
import { mocked } from "jest-mock";
import mongoose, { ObjectId } from "mongoose"; // Import ObjectId from mongoose
import {
  getRunningTracks,
  getAllCompletedRunningTracks,
} from "../../db/runningTracks"; // Adjust import paths as necessary
import {
  getAllRunningTracks as getAllRunningTracksController,
  getAllCompletedRunningTracksByUserId as getAllCompletedRunningTracksByUserIdController,
} from "../../controllers/runningTracks"; // Adjust import paths as necessary

jest.mock("../../db/runningTracks");

describe("Running Tracks Controller", () => {
  let mockReq: express.Request;
  let mockRes: express.Response;

  beforeEach(() => {
    mockReq = {} as express.Request;
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as express.Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllRunningTracks", () => {
    it("should return all running tracks", async () => {
      const mockRunningTracks = [
        {
          id: new mongoose.Types.ObjectId(), // Use ObjectId for id
          name: "Track 1",
          location: "Location 1",
          distance: 5,
          estimatedDuration: 20,
          isCompleted: false,
          dateTime: new Date("2024-06-30T08:00:00.000Z"),
          user: new mongoose.Types.ObjectId(), // Use ObjectId for user
        },
        {
          id: new mongoose.Types.ObjectId(), // Use ObjectId for id
          name: "Track 2",
          location: "Location 2",
          distance: 5,
          estimatedDuration: 20,
          isCompleted: false,
          dateTime: new Date("2024-06-30T08:00:00.000Z"),
          user: new mongoose.Types.ObjectId(), // Use ObjectId for user
        },
      ];

      mocked(getRunningTracks).mockResolvedValue(mockRunningTracks as any);

      await getAllRunningTracksController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockRunningTracks);
    });

    it("should handle errors", async () => {
      const errorMessage = "Database Error";

      mocked(getRunningTracks).mockRejectedValue(new Error(errorMessage));

      await getAllRunningTracksController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
  });

  describe("getAllCompletedRunningTracksByUserId", () => {
    it("should return all completed running tracks by user ID", async () => {
      const mockUserId = new mongoose.Types.ObjectId(); // Use ObjectId for user ID
      const mockRunningTracks = [
        {
          id: new mongoose.Types.ObjectId(),
          name: "Completed Track 1",
          isCompleted: true,
        },
        {
          id: new mongoose.Types.ObjectId(),
          name: "Completed Track 2",
          isCompleted: true,
        },
      ];

      mocked(getAllCompletedRunningTracks).mockResolvedValue(
        mockRunningTracks as any
      );

      mockReq.user = {
        id: mockUserId.toHexString(), // Convert ObjectId to string if necessary
        username: "testuser",
        email: "test@example.com",
        authentication: {
          password: "mockPassword",
          salt: "mockSalt",
        },
      };

      await getAllCompletedRunningTracksByUserIdController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockRunningTracks);
    });

    it("should handle errors", async () => {
      const errorMessage = "Database Error";

      mocked(getAllCompletedRunningTracks).mockRejectedValue(
        new Error(errorMessage)
      );

      mockReq.user = {
        id: new mongoose.Types.ObjectId().toHexString(), // Convert ObjectId to string if necessary
        username: "testuser",
        email: "test@example.com",
        authentication: {
          password: "mockPassword",
          salt: "mockSalt",
        },
      };

      await getAllCompletedRunningTracksByUserIdController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Server Error" });
    });

    it("should return 404 if user ID is missing", async () => {
      await getAllCompletedRunningTracksByUserIdController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Token not found" });
    });
  });

  //further test have to be written
});
