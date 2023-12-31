import { userLogin } from "./../../../application/usecases/auth/auth";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserDBInterface } from "../../../application/repositories/user";
import { AuthServiceInterface } from "../../../application/services/auth";
import { UserRepositoryMongoDB } from "../../../framework/database/mongoDB/repositories/user";
import { AuthService } from "../../../framework/service/authFramework";
import { userRegister } from "../../../application/usecases/auth/auth";

const authController = (
  userDBRepository: UserDBInterface,
  userDBRepositoryImpl: UserRepositoryMongoDB,
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService
) => {
  const authService = authServiceInterface(authServiceImpl());
  const userDB = userDBRepository(userDBRepositoryImpl());

  const registerUserController = asyncHandler(
    async (req: Request, res: Response) => {
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      try {
        const response = await userRegister(userData, userDB, authService);
        res.json({ response, ok: true });
      } catch (err: any) {
        if (err) {
          res.json({ message: err.message });
        }
      }
    }
  );

  const userLoginController = asyncHandler(
    async (req: Request, res: Response) => {
      const userData = req.body;
      try {
        const response = await userLogin(userData, userDB, authService);
        res.json({ response, ok: true });
      } catch (err: any) {
        res.json({ message: err.message });
      }
    }
  );

  return {
    registerUserController,
    userLoginController,
  };
};

export default authController;
