import express from 'express'
import authController from '../../../../adapters/controllers/auth/auth'
import { userDBRepository } from '../../../../application/repositories/user'
import { userRepositoryMongoDB } from '../../../database/mongoDB/repositories/user'
import { authServiceInterface } from '../../../../application/services/auth'
import { authService } from '../../../service/authFramework'

const authRoutes = () => {
    const router = express.Router()
    const controller = authController(
        userDBRepository,
        userRepositoryMongoDB,
        authServiceInterface,
        authService
    )
    router.post('/user-register', controller.registerUserController)
    
    router.post('/user-login',controller.userLoginController)

    return router
}

export default authRoutes