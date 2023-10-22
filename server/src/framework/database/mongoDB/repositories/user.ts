
import { RegisteredUser } from "../../../../types/user"
import User from "../models/user_side/user"
import Files from "../models/user_side/files"


export const userRepositoryMongoDB = () => {
    const getUserByEmail = async (email: string) => {
        console.log(email)
        try {
            const userData = await User.findOne({ email: email })
            if (userData) {
                return userData
            } else {
                return null
            }
        } catch (err) {
            console.log(err)
        }
    }

    const addUser = async (userData: RegisteredUser) => {
        try {
            const res = await User.create(userData)
            return res
        } catch (err) {
            console.log(err)
        }
    }

    const addPDF = async (userId :string, fileName:string) => {
        const data = {fileName,userId}
        try {
            const res = await Files.create(data)
            return res
        } catch (err) {
            console.log(err)
        }
    }


    return {
        getUserByEmail,
        addUser,
        addPDF
    }
}

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB