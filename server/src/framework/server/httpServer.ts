//importing types of server
import { Server } from 'http'

//importing env variables
import configKey from '../../config'

//server configuration method
const serverConfig = (server: Server) => {
    const startServer = () => {
        server.listen(configKey.serverPort, () => {
            console.log(`listening on ${configKey.serverPort}`)
        })    
    }

    return {startServer}
}


export default serverConfig