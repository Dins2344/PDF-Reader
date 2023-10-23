// import { Request } from 'express'
import multer from "multer";
// import { v4 as uuidv4 } from "uuid";
// import path from "path";
// import fs from 'fs'

// const storage = multer.diskStorage({
//   destination: (req: Request, file: Express.Multer.File, cb) => {
//     // Specify the absolute path to the destination directory
//     const uploadDir = path.join(__dirname, "public", "uploads");

//     // Create the directory if it doesn't exist
//     fs.mkdirSync(uploadDir, { recursive: true });

//     cb(null, uploadDir);
//   },
//   filename: (req: Request, file: Express.Multer.File, cb) => {
//     const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
//     cb(null, uniqueFileName);
//   },
// });
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });


export default upload