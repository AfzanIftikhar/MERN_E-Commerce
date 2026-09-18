import mongoose  from 'mongoose'

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "first name is required"],
 },
 lastname:{
  type:String,
  required:[true , "last name is required"]
 },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email must be unique"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
});



const userModel = mongoose.model("users", userSchema)


export default userModel