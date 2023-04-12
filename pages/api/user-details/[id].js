import mongoose from "mongoose";
import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";

export default async function handler(req, res) {
  const { method } = req;

  // Connect to database
  await dbConnect();

  // Return all tasks of a specific user from database sorted descending based on date of creation
  if (method === "GET") {
    try {
      const { id } = req.query;
      const tasks = await Task.aggregate([
        {
          // Filter by the user ID
          $match: { assignee: mongoose.Types.ObjectId(id) },
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
          $sort: { createdAt: -1 },
        },
      ]);
      res.status(200).json({ data: tasks });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  }
}
