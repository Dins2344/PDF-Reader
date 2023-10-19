import { UserRepositoryMongoDB } from "../../framework/database/mongoDB/repositories/user";
import { RegisteredUser } from "../../types/user";


export const userDBRepository = (repository: ReturnType<UserRepositoryMongoDB>) => {
    const getUserByEmail = async (email: string) => {
        return await repository.getUserByEmail(email)
    }
    const addUser = async(userData: RegisteredUser) => {
        return await repository.addUser(userData)
    }

    return {
        getUserByEmail,
        addUser
    }
}


export type UserDBInterface =  typeof userDBRepository