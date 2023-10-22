import asyncHandler from "express-async-handler";
import express, { Response } from "express";
import { UserDBInterface } from "../../../application/repositories/user";
import { UserRepositoryMongoDB } from "../../../framework/database/mongoDB/repositories/user";
import { mergeAndSave } from "../../../application/usecases/user/user";
import { CustomRequest } from "../../../types/common";

const userController = (
  userDBRepository: UserDBInterface,
  userDBRepositoryImpl: UserRepositoryMongoDB
) => {
  const userDB = userDBRepository(userDBRepositoryImpl());

const mergeAndSaveController = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const user = req?.user;
    const pdfBuffer = req?.file?.buffer;
    const pagesToExtract = JSON.parse(req.body.selectedPages);

    try {
      if (pdfBuffer && user) {
        const response = await mergeAndSave(
          { user, pdfBuffer, pagesToExtract },
          userDB
        );

        if (response) {
          // Set response headers for the downloaded PDF
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            `attachment; filename=${response.fileName}`
          );

          console.log(response.extractedPdfBytes)
          // Send the PDF data as the response body
          const data = response.extractedPdfBytes
          res.json({data})
          // res.send(response.extractedPdfBytes);
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
      res.status(500).json({ ok: false, message: err.message});
    }
  }
);


  return {
    mergeAndSaveController,
  };
};

export default userController;
