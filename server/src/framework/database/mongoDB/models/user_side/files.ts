// import the Schema and model from the mongoose
import { Schema, model } from "mongoose";

//configuring model for ExtractedFiles collection
const fileSchema = new Schema({
  fileName: String, // Original file name
  fileData: Buffer, // Binary data of the PDF file
  userId: {
    type:Schema.Types.ObjectId, // Reference to User model
    ref: "User", // Reference the 'User' model
    required: [true, "Please add a user"],
  },
  createdOn: {
    type: Date,
    default: Date.now, // Use Date objects for dates
  },
});

const ExtractedFiles = model("ExtractedFiles", fileSchema, "extractedFiles");
export default ExtractedFiles;
