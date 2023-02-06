import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, required: false },
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
