import { UserDBInterface } from "../../repositories/user";
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import { JwtPayload } from "../../../types/common";

interface FileData {
  user: JwtPayload;
  pdfBuffer: Buffer;
  pagesToExtract: number[];
}

export const mergeAndSave = async (
  data: FileData,
  userRepository: ReturnType<UserDBInterface>
) => {
  if (!data.pagesToExtract.length) {
    throw new Error("Please select a page to extract");
  } else {
    const pdfDoc = await PDFDocument.load(data.pdfBuffer);
    const extractedPdfDoc = await PDFDocument.create();
    for (const pageIndex of data.pagesToExtract) {
      const [copiedPage] = await extractedPdfDoc.copyPages(pdfDoc, [pageIndex-1]);
      extractedPdfDoc.addPage(copiedPage);
    }
    const extractedPdfBytes = await extractedPdfDoc.save();
    const now = new Date().getTime();
    const fileName = `extracted${now}.pdf`;
    const savePath = `public/uploads/${fileName}`;

    const response = await userRepository.addFile(data.user.Id, fileName);
    if (response) {
      // Save the extracted PDF to the specified path
      fs.writeFileSync(savePath, extractedPdfBytes);
      return { extractedPdfBytes, fileName };
    } else {
      throw new Error("Database error");
    }
  }
};
