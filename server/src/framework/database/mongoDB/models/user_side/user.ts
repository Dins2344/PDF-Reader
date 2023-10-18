import  { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "please add a first name"],
  },
  lastName: {
    type: String,
    required: [true, "please add a first name"],
  },
//   email: {
//     type: String,
//     required: [true, "please add a first name"],
//     unique: true,
//   },
//   password: {
//     type: String,
//   },
//   status: {
//     type: String,
//     default: "active",
//   },
//   joinedOn: {
//     type: String,
//     default: new Date().toDateString(),
//   },
 
});

const User = model("User", userSchema, "users");
export default User;
