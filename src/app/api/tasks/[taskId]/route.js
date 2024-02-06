import { connectDb } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";



export async function GET(request,{params}){
  const {taskId}=params;
  try {
    await connectDb();
    const task=await Task.findOne({
      _id:taskId
    })
    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error,{
      message: "failed to get task",
      status: 500,
    })
  }
  
}

export async function POST(){

}

export async function PUT(request,{params}){
  const {taskId}=params;
  const body=await request.json();
  console.log(body);
  try {
    await connectDb();
    const task=await Task.findOneAndUpdate({
      _id:taskId
    },body,{
      new:true
    })
    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error,{
      message: "failed to update task",
      status: 500,
    })
  }
}

export async function DELETE(request,{params}){
  const {taskId}=params;
  try {
    await connectDb();
    await Task.deleteOne({
      _id:taskId
    })
    return NextResponse.json({
      message:"deleted task",
      success: true,
    })
  } catch (error) {
    console.log(error);
    return NextResponse.json(error,{
      message: "failed to delete task",
      status: 500,
    })
  }
}