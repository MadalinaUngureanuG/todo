import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";

export default async function handler(req, res) {
  const { method } = req;

  // Connect to database
  await dbConnect();

  // Create a task
  if (method === "POST") {
    try {
      let data = JSON.parse(req.body);
      let newTask = await new Task(data).save();
     data.id = newTask.id;
      res
        .status(200)
        .json({ data: data, message: "Task added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  // Return all tasks from database sorted descending based on date of creation
  if (method === "GET") {
    // if search is truthy it is used as the pattern for the regular expression. Otherwise, the regular expression matches any string (i.e., /./).
    try {
      const {search} = req.query
      const tasks = await Task.aggregate([{
        $match: {
          task: { $regex: search ? new RegExp(`${search}`, "i") : /./ }
        }
      },
        {
          $lookup: {
            from: "users",
            localField: "assignee",
            foreignField: "_id",
            as: "assignee",
          },
        },
        {
          $unwind: "$assignee",
        },
        {
          $addFields: {
            "assignee.firstName": "$assignee.firstName",
            "assignee.lastName": "$assignee.lastName",
          },
        },
        {
          $sort: {createdAt: -1}
        }
      ]);
      res.status(200).json({ data: tasks });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  }
}
