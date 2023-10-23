import { RegisteredUser } from "../../../../types/user";
import User from "../models/user_side/user";
import ExtractedFiles from "../models/user_side/files";
import PDFModel from "../models/user_side/PDFfiles";

export const userRepositoryMongoDB = () => {
  const getUserByEmail = async (email: string) => {
    console.log(email);
    try {
      const userData = await User.findOne({ email: email });
      if (userData) {
        return userData;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async (userData: RegisteredUser) => {
    try {
      const res = await User.create(userData);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const savePDF = async (file: Buffer, fileName: string, userId: string) => {
    const data = {
      fileName: fileName,
      fileData: file,
      userId,
    };
    try {
      return await PDFModel.create(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPDF = async (fileId: string) => {
    try {
      const file = await PDFModel.findById(fileId);
      return file?.fileData;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const addPDF = async (userId: string, fileData: Buffer, fileName: string) => {
    const data = {
      fileName,
      fileData,
      userId,
    };
    try {
      const res = await ExtractedFiles.create(data);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getUserByEmail,
    addUser,
    savePDF,
    getPDF,
    addPDF,
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
