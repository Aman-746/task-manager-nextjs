import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";



export async function GET(request) {

  let users = [];
  try {
    await connectDb();
    users = await User.find().select("-password");
    console.log(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      message: "failed to get users",
      status: 500,
    });

  }

  // const users = [
  //   {
  //     name: "Aman Kumar",
  //     phone: "7462933412",
  //     place: "Gaya"
  //   },
  //   {
  //     name: "Shweta Bain",
  //     phone: "9340885646",
  //     place: "Gorakhpur"
  //   },
  //   {
  //     name: "baby",
  //     phone: "7462933412",
  //     place: "Gaya"
  //   },
  // ];




  return NextResponse.json(users);
}


export async function POST(request) {
  // fetch user detail from request

  const { name, email, password, about } = await request.json();
  // create object user with user model

  const user = new User({
    name,
    email,
    password,
    about,
  });

  try {
    user.password = bcrypt.hashSync(
      user.password,
      parseInt(process.env.BCRYPT_SALT)
    );
    await connectDb();
    const createdUser = await user.save();
    console.log(createdUser);
    const response = NextResponse.json(createdUser, {
      status: 201,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to create user",
      status: false,
    })
  }







  // const body=request.body;
  // console.log(body);
  // console.log(request.method);
  // console.log(request.cookies);
  // console.log(request.headers);
  // return NextResponse.json({
  //   message:"posting user data",
  // })
}

export function DELETE(request) {
  console.log("delete api called");
  return NextResponse.json({
    message: "deleted !!",
    status: true,
  });
}

export function PUT() {

}