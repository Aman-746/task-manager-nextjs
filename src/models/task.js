import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userrr: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed","just_created"],
    default: "pending",
  },
  

});

export const Task = mongoose.models.tasks || mongoose.model("tasks", TaskSchema);