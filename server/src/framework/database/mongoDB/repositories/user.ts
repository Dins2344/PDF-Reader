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
    } catch (err:any) {
      console.log(err);
      throw new Error(err.message)
    }
  };

  const getExtractedPDF = async (fileId: string) => {
    try {
      const res = await ExtractedFiles.findById(fileId)
      return res
    } catch (err: any) {
      throw new Error(err.message)
    }

  }

  const getAllExtractedFiles = async (userId: string) => {
    try {
      const files = await ExtractedFiles.find({ userId: userId })
      return files
    } catch (err:any) {
      console.log(err)
      throw new Error(err.message)
    }
  }

  return {
    getUserByEmail,
    addUser,
    savePDF,
    getPDF,
    addPDF,
    getExtractedPDF,
    getAllExtractedFiles,
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
