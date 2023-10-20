import api from "./interceptors"
import { userLoginData, userRegisterData } from "../types/user"

export const userLogin = async (userData:userLoginData) => {
    try {
        const {data} = await api.post('/auth/user-login', userData)
        return data
    } catch (err) {
        console.log(err)
    }

}

export const userRegister = async (userData: userRegisterData) => {
    try {
        const { data } = await api.post('/auth/user-register', userData)
        return data
    } catch (err) {
        console.log(err)
    }
}