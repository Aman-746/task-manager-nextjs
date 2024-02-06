import { connectDb } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";


// get all tasks by given user id 
export async function GET(request,{params}){
  const {userid}=params;
  // console.log(userid);
  try{
    await connectDb();
    const tasks = await Task.find({
      userrr:userid
    })
    return NextResponse.json(tasks);
  } catch(error){
    console.log(error);
    return NextResponse.json({
      message:"error in getting user",
      success: false,
    })
  }
}