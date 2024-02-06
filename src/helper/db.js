import { User } from "@/models/user";
import mongoose from "mongoose";

const config = {
  isConnected: 0,
}

export const connectDb = async () => {

  if(config.isConnected) return;
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "work_manager",
    });
    console.log("db connected");
    console.log(connection.readyState);
    config.isConnected=connection.readyState;

    // testing and creating new user
    // const user=new User({
    //   name: "test name",
    //   email: "test@gmail.com",
    //   password: "test password",
    //   about: "this is testing",
    // });
    // await user.save();
    // console.log("user is created");

    console.log("connected to host", connection.host);
  } catch (error) {
    console.log("failed to connect with db");
    console.log(error);
  }
};