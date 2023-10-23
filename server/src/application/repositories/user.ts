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

    return {
        getUserByEmail,
        addUser,
        saveFile,
        getFile,
        addFile
    }
}


export type UserDBInterface =  typeof userDBRepository