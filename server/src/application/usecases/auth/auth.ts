import { LoginUser, RegisteredUser } from "../../../types/user";
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


export const userLogin = async (
  userData: LoginUser,
  userRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const isUserExist = await userRepository.getUserByEmail(userData.email);
  if (!isUserExist) {
    throw new Error("account not found");
  } else {
    const isPasswordMatch = await authService.comparePassword(
      userData.password,
      isUserExist.password
    );
    if (!isPasswordMatch) {
      throw new Error("Entered password is not matching");
    } else {
      const token = authService.generateToken({
        Id: isUserExist._id.toString(),
        email: isUserExist.email,
      });
      return token;
    }
  }
};
