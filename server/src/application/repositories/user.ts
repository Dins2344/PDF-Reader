import { UserRepositoryMongoDB } from "../../framework/database/mongoDB/repositories/user";
import { RegisteredUser } from "../../types/user";


export const userDBRepository = (repository: ReturnType<UserRepositoryMongoDB>) => {
    const getUserByEmail = async (email: string) => {
        return await repository.getUserByEmail(email)
    }
    const addUser = async(userData: RegisteredUser) => {
        return await repository.addUser(userData)
    }

    const addFile = async (userId: string, fileName: string) => {
       return await repository.addPDF(userId,fileName)
    }

    return {
        getUserByEmail,
        addUser,
        addFile
    }
}


export type UserDBInterface =  typeof userDBRepository