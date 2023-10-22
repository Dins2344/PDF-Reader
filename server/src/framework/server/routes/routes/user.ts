
import express from 'express'
import userController from '../../../../adapters/controllers/user_side/user'
import upload from '../../middlewares/fileUpload'
import jwtAuthMiddleware from '../../middlewares/JWTauth';

import { userDBRepository } from "../../../../application/repositories/user";
import { userRepositoryMongoDB } from "../../../database/mongoDB/repositories/user";





const userRoutes = () => {
    const router = express.Router()
    const controller = userController(userDBRepository, userRepositoryMongoDB);

    router.post(
      "/merge-and-save",
      jwtAuthMiddleware,
      upload.single("pdfFile"),
      controller.mergeAndSaveController
    );

    return router
}

export default userRoutes