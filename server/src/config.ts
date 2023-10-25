// importing the dotenv library for enabling the env 
import dotenv from "dotenv";

dotenv.config();


// collecting all the env and exporting 
const configKey = {
  serverPort: process.env.PORT,
  mongoURL: process.env.MONGO_DB_URL as string,
  DBName: process.env.DB_NAME as string,

  JWT_SECRET: process.env.JWT_SECRET_KEY as string,
};

export default configKey;
