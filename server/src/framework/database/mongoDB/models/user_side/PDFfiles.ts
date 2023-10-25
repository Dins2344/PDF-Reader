import mongoose from "mongoose";

//configuring model for uploaded original PDF files collection
const pdfSchema = new mongoose.Schema({
  fileName: String, // Original file name
  fileData: Buffer, // Binary data of the PDF file
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User", // Reference the 'User' model
    required: [true, "Please add a user"],
  },
  createdOn: {
    type: Date,
    default: Date.now, // Use Date objects for dates
  },
});

const PDFModel = mongoose.model("PDF", pdfSchema);

export default PDFModel