import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  tasksCount: { type: Number, default: 0 },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
