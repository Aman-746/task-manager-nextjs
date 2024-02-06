import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";



export async function GET(request) {
  let tasks=[];
  try{
    await connectDb();
    tasks=await Task.find();
    console.log(tasks);
    return NextResponse.json(tasks);
  } catch(error){
    console.log(error);
    return NextResponse.json(error,{
      message:"failed to get tasks",
      status:500,
    });
  }
}

export async function POST(request) {
  const { title, content, userrr, status } = await request.json();

  const authToken=request.cookies.get("authToken")?.value;
  const data=jwt.verify(authToken,process.env.JWT_KEY);
  console.log(data._id);

  try {
    const task = new Task({
      title,
      content,
      userrr: data._id,
      status,
    });
    await connectDb();
    const createdTask = await task.save();
    console.log(createdTask);
    // console.log(userId);
    const response= NextResponse.json(createdTask, {
      status: 201,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to create task",
      status: false,
    })
  }
}