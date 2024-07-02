import express from "express";
import { getUserByEmail, createUser } from "../db/users";
import { generateToken, random, authentication } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email)?.select(
      "+authentication.salt +authentication.password"
    );
    if (
      !user ||
      !user.authentication ||
      typeof user.authentication.salt !== "string"
    ) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const token = generateToken(user.id.toString());
    return res.send({
      token,
      user: {
        email: user.email,
        userName: user.username,
        id: user.id,
      },
    });

    // user.authentication.token = token;
    // await user.save();

    // Return the token in the response body
    return res.status(200).json({ token }).end();
  } catch (error) {
    console.error("Login error:", error);
    return res.sendStatus(500);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const hashedPassword = authentication(salt, password);
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: hashedPassword,
      },
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.error("Registration error:", error);
    return res.sendStatus(500);
  }
};
export const logout = async (req: express.Request, res: express.Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
};
