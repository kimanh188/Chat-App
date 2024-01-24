import { UserModel } from "../models/userModel.js";

export async function searchForUsers(req, res, next) {
  try {
    const { searchInput } = req.body;

    //find users whose username contains searchedUser
    const matchedUsers = await UserModel.find({
      username: { $regex: searchInput, $options: "i" },
    });

    if (!matchedUsers || matchedUsers.length === 0) {
      return res.status(404).json({
        answer: {
          code: 404,
          message: "User not found",
        },
      });
    }

    res.status(200).json({
      answer: {
        code: 200,
        message: "User found",
        data: matchedUsers.map((user) => user.username),
      },
    });
  } catch (error) {
    console.log();
  }
}
