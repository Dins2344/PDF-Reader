//import express and app type
import express, { Application } from "express";

import bodyParser from 'body-parser'

//import morgan for log
import morgan from 'morgan'

//import cors for resource sharing across other websites
import cors from 'cors'


const expressConfig = (app: Application) => {
    app.use(morgan("dev"));
    app.use(
      cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        // allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
        // exposedHeaders: "X-Custom-Header",
      })
    );
    app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.json());
}

export default expressConfig