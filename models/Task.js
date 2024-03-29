import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, required: false },
  createdAt: { type: Date, default: Date.now },
  assignee: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false},
  deadline: {type: String, required: true}
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
