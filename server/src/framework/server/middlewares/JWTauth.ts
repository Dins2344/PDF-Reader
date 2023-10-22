import { NextFunction, Response } from "express";

import { authService } from "../../service/authFramework"; 

import { Request } from "express";

interface CustomRequest extends Request {
  user?: string;
}

const jwtAuthMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | null = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
      res.json({ok:false,message:'Token not found'})
  }
  try {
    const { payload }: any = authService().verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
      res.json({ok:false ,message:'Un-authorized user'})
  }
};

export default jwtAuthMiddleware;
