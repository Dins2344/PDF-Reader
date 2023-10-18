import { Application } from "express";
import userRoutes from "./routes/user";


const routes = (app: Application) => {
    app.use('/api/user',userRoutes())
}


export default routes