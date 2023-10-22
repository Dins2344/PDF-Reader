import { Request } from "express";
export interface JwtPayload {
  Id: string;
  email: string;
}

export interface CustomRequest extends Request {
  user?: {
    Id: string;
    email: string;
  };
}
