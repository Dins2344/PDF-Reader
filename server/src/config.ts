import dotenv from "dotenv";

dotenv.config();

const configKey = {
  serverPort: process.env.PORT,
  mongoURL: process.env.MONGO_DB_URL as string,
  DBName: process.env.DB_NAME as string,

  JWT_SECRET: process.env.JWT_SECRET_KEY as string,
};

export default configKey;
