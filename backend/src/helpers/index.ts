import crypto from "crypto";

import jwt from "jsonwebtoken";

const JWT_SECRET = "TODOAPP-ACASUS-KISSIMONKADENES";

export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    const decodedUser = jwt.verify(token, JWT_SECRET);
    return decodedUser;
  } catch (error) {
    return null;
  }
};
export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(JWT_SECRET)
    .digest("hex");
};
