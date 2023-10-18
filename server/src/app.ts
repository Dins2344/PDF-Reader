//import express and app type
import express, { Application } from 'express'

// import http module
import http from 'http'

//import server and express configurations
import serverConfig from './framework/server/httpServer'
import expressConfig from './framework/server/expressConfig'

// import mongoDB connection logic
import connectDB from './framework/database/mongoDB/connection'

import routes from './framework/server/routes'

const app: Application = express()

// creating server and passing with server config
const server = http.createServer(app)
const {startServer} = serverConfig(server)

expressConfig(app)
connectDB()
routes(app)







startServer()

 