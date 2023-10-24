import { getAllExtractedFiles } from "./../../../application/usecases/user/user";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { UserDBInterface } from "../../../application/repositories/user";
import { UserRepositoryMongoDB } from "../../../framework/database/mongoDB/repositories/user";
import {
  downloadExtractedFile,
  getPDF,
  mergeAndSave,
  saveFile,
} from "../../../application/usecases/user/user";
import { CustomRequest } from "../../../types/common";

const userController = (
  userDBRepository: UserDBInterface,
  userDBRepositoryImpl: UserRepositoryMongoDB
) => {
  const userDB = userDBRepository(userDBRepositoryImpl());

  const saveFileController = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const file = req.file?.buffer;
      const fileName = req.file?.originalname;
      const userId = req.user?.Id;
      if (file && userId && fileName) {
        try {
          const response = await saveFile({ fileName, userId, file }, userDB);
          if (response) {
            res.json({ ok: true, response, message: "successfully uploaded" });
          } else {
            res.json({ ok: false, message: "upload failed" });
          }
        } catch (err: any) {
          if (err) {
            res.json({ ok: false, message: err.message });
          }
        }
      }
    }
  );

  const getPDFController = asyncHandler(async (req: Request, res: Response) => {
    const fileId = req.params.id;
    try {
      const fileData: Buffer = await getPDF(fileId, userDB);
      if (fileData) {
        res.send(fileData);
      } else {
        res.json({ ok: false, message: "PDF not found" });
      }
    } catch (err: any) {
      res.json({ ok: false, message: err.message });
    }
  });

  const mergeAndSaveController = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const user = req?.user;
      const bodyData = req.body;

      try {
        if (bodyData && user) {
          const response = await mergeAndSave(
            {
              user,
              pagesToExtract: bodyData.selectedPages,
              fileId: bodyData.fileId,
            },
            userDB
          );

          if (response) {
            res.json({
              ok: true,
              fileId: response._id,
              message: "File successfully extracted",
            });
          } else {
            // Handle the case where the response is not as expected
            res
              .status(500)
              .json({ ok: false, message: "Response format is incorrect" });
          }
        } else {
          // Handle the case where required data is missing
          res
            .status(400)
            .json({ ok: false, message: "Missing user or PDF data" });
        }
      } catch (err: any) {
        // Handle other unexpected errors
        console.error(err);
        res.status(500).json({ ok: false, message: err.message });
      }
    }
  );

  const downloadPDFController = asyncHandler(
    async (req: Request, res: Response) => {
      const fileId = req.params.id;
      try {
        const fileDetail = await downloadExtractedFile(fileId, userDB); // getting the buffer data and filename from the database

        res.setHeader("Content-Type", "application/pdf"); //setting response headers for sending PDF file
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${fileDetail.fileName}`
        );
        res.send(fileDetail.fileData); //sending the file back to the front-end
      } catch (err: any) {
        // Handle other unexpected errors
        res.status(500).json({ ok: false, message: err.message });
      }
    }
  );

  const getAllExtractedFilesController = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const userId = req.user?.Id;
      if (userId) {
        try {
          const files = await getAllExtractedFiles(userId, userDB);
          res.json({
            ok: true,
            message: "Successfully retrieved files",
            files,
          });
        } catch (err: any) {
          res.json({ ok: false, message: err.message });
        }
      }
    }
  );

  return {
    saveFileController,
    mergeAndSaveController,
    getPDFController,
    downloadPDFController,
    getAllExtractedFilesController,
  };
};

export default userController;
