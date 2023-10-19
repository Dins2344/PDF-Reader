import api from "./interceptors"
import { userLoginData } from "../types/user"

export const userLogin = async (userData:userLoginData) => {
    try {
        const {data} = await api.post('/auth/user-login', userData)
        return data
    } catch (err) {
        console.log(err)
    }

}