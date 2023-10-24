import { UserRepositoryMongoDB } from "../../framework/database/mongoDB/repositories/user";
import { RegisteredUser } from "../../types/user";


export const userDBRepository = (repository: ReturnType<UserRepositoryMongoDB>) => {
    const getUserByEmail = async (email: string) => {
        return await repository.getUserByEmail(email)
    }
    const addUser = async(userData: RegisteredUser) => {
        return await repository.addUser(userData)
    }

    const saveFile = async (file: Buffer, fileName:string, userId: string) => {
        return await repository.savePDF(file,fileName,userId)
    }

    const getFile = async (fileId: string) => {
        return await repository.getPDF(fileId)
    }

    const addFile = async (userId: string,fileData:Buffer, fileName: string) => {
       return await repository.addPDF(userId,fileData,fileName)
    }
    const getExtractedFile = async (fileId: string) => {
        return await repository.getExtractedPDF(fileId)
    }

    const getAllExtractedFiles = async (userId: string) => {
        return await repository.getAllExtractedFiles(userId)
    }

    const deleteExtractedFile = async (fileId: string) => {
        return await repository.deleteExtractedFile(fileId)
    }

    return {
      getUserByEmail,
      addUser,
      saveFile,
      getFile,
      addFile,
      getExtractedFile,
      getAllExtractedFiles,
      deleteExtractedFile,
    };
}


export type UserDBInterface =  typeof userDBRepository