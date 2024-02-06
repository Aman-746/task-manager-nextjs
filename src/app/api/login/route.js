import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";


export async function POST(request) {
  const { email, password } = await request.json();

  try {
    // 1. get user
    await connectDb();
    const user = await User.findOne({
      email: email,
    })

    if (user == null) {
      throw new Error("User not found !!");
    }

    // 2. match password
    const matched = bcrypt.compareSync(password, user.password);
    if (!matched) {
      throw new Error("Password not matched !!");
    }

    // 3. generate token
    const token = jwt.sign(
      {
        _id:user._id,
        name:user.name,
      },
      process.env.JWT_KEY
    );
    // console.log(token);

    // 4. create nextResponse cookie
    const response=NextResponse.json({
      message: "Login success !!",
      status: true,
      user: user,
    })

    response.cookies.set("authToken",token,{
      expiresIn:"1d",
      httpOnly: true,
    });

    // console.log(user);

    return response;

  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }

}