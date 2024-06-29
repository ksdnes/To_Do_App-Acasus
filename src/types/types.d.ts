import { Request } from "express";

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
    token: string;
  };
}
