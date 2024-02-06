import mongoose, { Schema } from "mongoose";

const UserSchema=new Schema({
  name: String,
  email: {
    type: String,
    require: [true,"Email required !!"],
  },
  password: {
    type: String,
    require: [true,"Password required !!"],
  },
  about: String,
  // profileURL: String,
  // address: {
  //   street: String,
  //   city: String,
  //   state: String,
  //   country: String,
  //   pincode: Number,
  // }
});

export const User=mongoose.models.users || mongoose.model("users",UserSchema);