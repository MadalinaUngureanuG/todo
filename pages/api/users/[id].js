import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  // Connect to database
  await dbConnect();

  // Update an user
  if (method === "PUT") {
    try {
      const result = await User.findByIdAndUpdate(
        id,
        { $set: JSON.parse(req.body) },
        { new: true }
      );
      res
        .status(200)
        .json({ data: result, message: "User updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Delete an user
  if (method === "DELETE") {
    try {
      const result = await User.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  // Get details about one selected user
  if (method === "GET") {
    try {
      const result = await User.findById(id);
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
      res
        .status(200)
        .json({ data: result, message: "User updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
