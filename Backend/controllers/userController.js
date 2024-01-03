import { UserModel } from "../models/userModel.js";
import { errorCreator } from "../lib/errorCreator.js";

export async function registerPostController(req, res, next) {
  const { email, username, password } = req.body;

  try {
    const newUser = await UserModel.create({
      email: email,
      username: username,
      password: password,
    });

    const newUserObject = newUser.toObject();

    delete newUserObject.password;

    res.status(200).json({
      answer: {
        code: 200,
        message: "Signed up",
        data: newUserObject,
      },
    });
  } catch (error) {
    console.log(error);
    next(errorCreator(401, "User already exists"));
  }
}

export async function loginPostController(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        answer: {
          code: 401,
          message: "Your email or password is incorrect",
        },
      });
    }

    const isPasswordCorrect = await user.auth(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        answer: {
          code: 401,
          message: "Your email or password is incorrect",
        },
      });
    } else {
      const userObject = user.toObject();
      delete userObject.password;
      //userObject.jwt = req.jwt;

      res.status(200).json({
        answer: {
          code: 200,
          message: "Signed in",
          data: userObject,
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(errorCreator(401, "User not found"));
  }
}

export function logoutPostController(req, res, next) {
  try {
    res.clearCookie("jwt");

    res.status(200).json({
      answer: {
        code: 200,
        message: "Logged out",
      },
    });
  } catch (error) {
    console.log(error);
    next(errorCreator(500, "Internal server error"));
  }
}
