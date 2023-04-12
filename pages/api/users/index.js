import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  // Connect to database
  await dbConnect();

  // Create a new user
  if (method === "POST") {
    try {
      const data = JSON.parse(req.body);
      const newUser = await new User(data).save();
      res
        .status(200)
        .json({ data: newUser, message: "User added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  // Return all tasks from database sort descending based on date of creation
  if (method === "GET") {
    // aggregate is used to join the users collection with tasks collection
    try {
      const {search} = req.query
      const users = await User.aggregate([{
        $match: {
          $or: [
          { firstName: { $regex: search ? new RegExp(`${search}`, "i") : /./ } },
          { lastName: { $regex: search ? new RegExp(`${search}`, "i") : /./ } },
          { phone : { $regex: search ? new RegExp(`${search}`, "i") : /./ } },
          { email: { $regex: search ? new RegExp(`${search}`, "i") : /./ } }
         ]
        }
      },
        {
          $lookup: {
            from: "tasks",
            // The localField is set to "_id" which is the common field between the users and tasks collections
            localField: "_id",
            // foreignField is set to "assignee" which is the field that references the user in the tasks collection
            foreignField: "assignee",
            as: "tasks",
          },
        },
        {
          // The $addFields stage is used to add a new field to the resulting documents called "tasksCount"
          $addFields: {
            tasksCount: {
              $size: "$tasks",
            },
            firstName: "$firstName",
            lastName: "$lastName",
          },
        },
        {
          $project: {
            tasks: 0,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ]);
      res.status(200).json({ data: users });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      consol.log(error);
    }
  }
}
