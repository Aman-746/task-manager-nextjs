import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";



export async function GET(request,{params}){
  const {userid}=params;
  try{
    await connectDb();
    const user=await User.findOne({
      _id:userid
    })
    return NextResponse.json(user);
  } catch(error){
    console.log(error);
    return NextResponse.json({
      message:"error in getting user",
      success: false,
    })
  }
  
}

export async function DELETE(request,{params}){
  console.log(params);
  // const userid=params.userid;
  const {userid}=params;
  try{
    await connectDb();
    await User.deleteOne({
      _id:userid
    })
    return NextResponse.json({
      message:"deleted user",
      success: true,
    })
  } catch(error){
    console.log(error);
    return NextResponse.json({
      message:"error in deleting user",
      success: false,
    })
  }

  // console.log("userid",userid);
  // return NextResponse.json({
  //   message:"testing delete"
  // })
}

// update user

export async function PUT(request,{params}){
  const {userid}=params;
  const body=await request.json();
  console.log(body);
  try{
    await connectDb();
    const user=await User.findOneAndUpdate({
      _id:userid
    },body,{
      new:true
    })
    return NextResponse.json(user);
  } catch(error){
    console.log(error);
    return NextResponse.json({
      message:"error in updating user",
      success: false,
    })
  }
}