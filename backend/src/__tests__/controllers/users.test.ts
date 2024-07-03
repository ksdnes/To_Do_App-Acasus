import express from "express";
import { getAllUsers, getOneUser, updateUser } from "../../controllers/users";
import { getUsers, getUserById } from "../../db/users";

jest.mock("../../db/users");

describe("Users Controller", () => {
  let req: express.Request;
  let res: express.Response;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    } as express.Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      sendStatus: jest.fn(),
    } as unknown as express.Response;
  });

  describe("getAllUsers", () => {
    it("should return 200 and all users", async () => {
      const users = [{ username: "user1" }, { username: "user2" }];
      (getUsers as jest.Mock).mockResolvedValue(users);

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("should return 400 on error", async () => {
      (getUsers as jest.Mock).mockRejectedValue(new Error("DB Error"));

      await getAllUsers(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });
  });

  describe("getOneUser", () => {
    it("should return 200 and the user if found", async () => {
      const user = { username: "user1" };
      req.params.id = "1";
      (getUserById as jest.Mock).mockResolvedValue(user);

      await getOneUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should return 400 on error", async () => {
      req.params.id = "1";
      (getUserById as jest.Mock).mockRejectedValue(new Error("DB Error"));

      await getOneUser(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });
  });
});
