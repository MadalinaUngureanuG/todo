import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";

export default async function handler(req, res) {
  const { method } = req;

  // Connect to database
  await dbConnect();

  // Create task
  if (method === "POST") {
    try {
      const data = JSON.parse(req.body);
      const newTask = await new Task(data).save();
      res
        .status(200)
        .json({ data: newTask, message: "Task added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  // Return all tasks
  if (method === "GET") {
    try {
      const tasks = await Task.find();
      res.status(200).json({ data: tasks });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  }
}
