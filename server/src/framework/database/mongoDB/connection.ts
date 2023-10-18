import mongoose from "mongoose";
import configKeys from "../../../config";
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(configKeys.mongoURL, {
      dbName: configKeys.DBName,
    });
    console.log(`Database connected successfully`);
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;
