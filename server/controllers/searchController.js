import { UserModel } from "../models/userModel.js";
import { errorCreator } from "../lib/errorCreator.js";

export async function showAllUsers(req, res, next) {
  try {
    const thisUsername = req.user.username;
    //console.log(thisUsername);
    const allUsers = await UserModel.find({
      username: { $ne: thisUsername },
    });

    //console.log(allUsers);

    if (!allUsers || allUsers.length === 0) {
      return res.status(400).json({
        answer: {
          code: 400,
          message: "No users found",
        },
      });
    }

    res.status(200).json({
      answer: {
        code: 200,
        message: "Users found",
        data: allUsers,
      },
    });
  } catch (error) {
    console.log(error);
    next(errorCreator(500, "Error searching for users"));
  }
}

export async function searchForUsers(req, res, next) {
  try {
    const thisUser = req.user;
    const { searchInput } = req.body;

    //find users whose username contains searchedUser
    const matchedUsers = await UserModel.find({
      _id: { $ne: thisUser._id },
      username: { $regex: searchInput, $options: "i" },
    });

    if (!matchedUsers || matchedUsers.length === 0) {
      return res.status(404).json({
        answer: {
          code: 404,
          message: "Username not found",
        },
      });
    }

    const matchedUsersArray = matchedUsers.map((user) => {
      return {
        username: user.username,
        profileImg: user.profileImg,
      };
    });

    res.status(200).json({
      answer: {
        code: 200,
        message: "User found",
        data: matchedUsersArray,
      },
    });
  } catch (error) {
    console.log(error);
    next(errorCreator(500, "Error searching for users"));
  }
}
