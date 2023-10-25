// import { Request } from 'express'
import multer from "multer";

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });


export default upload