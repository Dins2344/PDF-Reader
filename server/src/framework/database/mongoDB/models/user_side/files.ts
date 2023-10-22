import { Schema, model } from "mongoose";

const fileSchema = new Schema({
  fileName: {
    type: String,
    required: [true, "please add a first name"],
  },
  userId: {
    type: Schema.Types.ObjectId, // Reference to User model
    ref: "User", // Reference the 'User' model
    required: [true, "Please add a user"],
  },
  createdOn: {
    type: Date,
    default: Date.now, // Use Date objects for dates
  },
});

const Files = model("Files", fileSchema, "files");
export default Files;
