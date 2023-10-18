import express, { Request, Response } from 'express'




const userRoutes = () => {
    const router = express.Router()

    router.get('/hello', (req: Request, res: Response) => {
        res.send('hello')
    })

    return router
}

export default userRoutes