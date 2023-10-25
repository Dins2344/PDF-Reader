
//import the api from interceptors
import api from "./interceptors"

// import the types
import { userLoginData, userRegisterData } from "../types/user"


//user login API calling functions
export const userLogin = async (userData:userLoginData) => {
    try {
        const {data} = await api.post('/auth/user-login', userData)
        return data
    } catch (err) {
        console.log(err)
    }

}


// userRegister API calling function
export const userRegister = async (userData: userRegisterData) => {
    try {
        const { data } = await api.post('/auth/user-register', userData)
        return data
    } catch (err) {
        console.log(err)
    }
}