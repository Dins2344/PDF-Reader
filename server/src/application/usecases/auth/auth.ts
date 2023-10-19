import { RegisteredUser } from "../../../types/user";
import { UserDBInterface } from "../../repositories/user";
import { AuthServiceInterface } from "../../services/auth";



export const userRegister = async (
  userData: RegisteredUser,
  userRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
    const isUserExist = await userRepository.getUserByEmail(userData.email);
  if (isUserExist) {
    throw new Error("user already exist");
  } else {
      userData.password = await authService.hashPassword(userData.password)
      const res = await userRepository.addUser(userData)
      if (!res) {
          throw new Error('user data adding failed')
      }
      const token = authService.generateToken({ Id: res._id.toString(), email: res.email })
      return token
    }
    
};
