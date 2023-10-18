import { Application } from "express";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";


const routes = (app: Application) => {
    app.use('/api/auth',authRoutes())
    app.use('/api/user', userRoutes())
    
}


export default routes