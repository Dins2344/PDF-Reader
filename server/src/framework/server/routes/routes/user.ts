import express from "express";
import userController from "../../../../adapters/controllers/user_side/user";
import upload from "../../middlewares/fileUpload";
import jwtAuthMiddleware from "../../middlewares/JWTauth";

import { userDBRepository } from "../../../../application/repositories/user";
import { userRepositoryMongoDB } from "../../../database/mongoDB/repositories/user";

const userRoutes = () => {
  const router = express.Router();
  const controller = userController(userDBRepository, userRepositoryMongoDB);

  router.post(
    "/upload-PDF",
    upload.single("PDFFile"),
    jwtAuthMiddleware,
    controller.saveFileController
  );

  router.get("/get-uploaded-fil/:id", controller.getPDFController);

  router.post(
    "/merge-and-save",
    jwtAuthMiddleware,
    controller.mergeAndSaveController
  );

  router.get(
    "/download-extracted-PDF/:id",
    jwtAuthMiddleware,
    controller.downloadPDFController
  );

  router.get(
    "/get-users-all-extracted-files",
    jwtAuthMiddleware,
    controller.getAllExtractedFilesController
  );

  router.get(
    "/delete-extracted-file/:id",
    jwtAuthMiddleware,
    controller.deleteExtractedFileController
  );

  return router;
};

export default userRoutes;
