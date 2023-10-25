import { Schema, model } from "mongoose";


// configuring the User model for User collection
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "please add a first name"],
  },
  email: {
    type: String,
    required: [true, "please add a email"],
  },
  password: {
    type: String,
    required: [true, "please add password"],
  },
  joinedOn: {
    type: String,
    default: new Date().toDateString(),
  },
});

const User = model("User", userSchema, "users");
export default User;
