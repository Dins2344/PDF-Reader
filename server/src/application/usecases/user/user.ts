import { UserDBInterface } from "../../repositories/user";
import { PDFDocument } from "pdf-lib";
import { JwtPayload, } from "../../../types/common";

interface FileData {
  userId: string,
  file: Buffer,
  fileName:string
}
export const saveFile = async (data: FileData,userRepository:ReturnType<UserDBInterface>) => {
  const res = await userRepository.saveFile(data.file,data.fileName, data.userId)
  if (!res) {
    throw new Error('File saving failed')
  } else {
    return res
  }
}

export const getPDF = async (fileId: string, userRepository: ReturnType<UserDBInterface>) => {
  const fileDetails = await userRepository.getFile(fileId)
  if (fileDetails) {
    return fileDetails;
  } else {
    throw new Error("File retrieving failed");
  }
}



interface MergeFileData {
  user: JwtPayload;
  pagesToExtract: number[];
  fileId:string
}


export const mergeAndSave = async (
  data: MergeFileData,
  userRepository: ReturnType<UserDBInterface>
) => {
  if (!data.pagesToExtract.length) {
    throw new Error("Please select a page to extract");
  } else {
    const PDFBuffer = await userRepository.getFile(data.fileId)
    if (PDFBuffer) {
      const pdfDoc = await PDFDocument.load(PDFBuffer);
      const extractedPdfDoc = await PDFDocument.create();
      for (const pageIndex of data.pagesToExtract) {
        const [copiedPage] = await extractedPdfDoc.copyPages(pdfDoc, [pageIndex-1]);
        extractedPdfDoc.addPage(copiedPage);
      }
      const extractedPdfBytes = await extractedPdfDoc.save();
      const now = new Date().getTime();
      const fileName = `extracted${now}.pdf`;
      const response = await userRepository.addFile(data.user.Id,Buffer.from(extractedPdfBytes), fileName);
      if (response) {
        return  response._id
      } else {
        throw new Error("Database error");
      }
      
    }
  }
};
