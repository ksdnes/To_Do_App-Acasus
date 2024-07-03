import express from "express";
import { login, register, logout } from "../../controllers/authentication";
import { createUser, getUserByEmail } from "../../db/users";
import { generateToken, random, authentication } from "../../helpers";

jest.mock("../../db/users");
jest.mock("../../helpers");

describe("Auth Controller", () => {
  let req: express.Request;
  let res: express.Response;

  beforeEach(() => {
    req = {
      body: {},
    } as express.Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      sendStatus: jest.fn(),
      send: jest.fn(),
      clearCookie: jest.fn().mockReturnThis(),
    } as unknown as express.Response;
  });

  describe("login", () => {
    it("should return 400 if email or password is missing", async () => {
      req.body = { email: "", password: "" };
      await login(req, res);
      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });

    // Add more tests here...
  });

  describe("register", () => {
    it("should return 400 if email, password, or username is missing", async () => {
      req.body = { email: "", password: "", username: "" };
      await register(req, res);
      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });

    // Add more tests here...
  });

  describe("logout", () => {
    it("should clear cookies and return 200", async () => {
      await logout(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Logged out successfully",
      });
    });
  });
});
