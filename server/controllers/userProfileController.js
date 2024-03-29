import fs from "fs/promises";
import { errorCreator } from "../lib/errorCreator.js";

export function profileGetController(req, res, next) {
  try {
    const user = req.user;
    const userInfo = user.toObject();
    delete userInfo.password;

    res.status(200).json({
      answer: {
        code: 200,
        message: "Retrieve User Profile",
        data: userInfo,
      },
    });
  } catch (error) {
    console.log(error);
    next(errorCreator(500, "Internal server error"));
  }
}

export async function changePasswordPutController(req, res, next) {
  try {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    const isPasswordCorrect = await user.auth(currentPassword);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        answer: {
          code: 401,
          message: "Current password incorrect",
        },
      });
    } else if (currentPassword === newPassword) {
      return res.status(400).json({
        answer: {
          code: 400,
          message: "New password must be different from current password",
        },
      });
    } else {
      const passwordValidation = /^(?=.*[A-Z]).{8,}$/;

      if (!passwordValidation.test(newPassword)) {
        return res.status(400).json({
          answer: {
            code: 400,
            message:
              "Password must be at least 8 characters long and contain at least one uppercase letter",
          },
        });
      } else {
        user.password = newPassword;
        await user.save();

        res.status(200).json({
          answer: {
            code: 200,
            message: "Password changed",
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(errorCreator(500, "Internal server error"));
  }
}

export async function uploadProfileImgPostController(req, res, next) {
  try {
    const user = req.user;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        answer: {
          code: 400,
          message: "No file uploaded",
        },
      });
    }

    if (user.profileImg) {
      const prevImgPath = user.profileImg;

      try {
        await fs.unlink(prevImgPath);
      } catch (unlinkError) {
        console.log("Error deleting previous image: ", unlinkError);
      }
    }

    user.profileImg = file.path;
    await user.save();

    res.status(200).json({
      answer: {
        code: 200,
        message: "Profile image uploaded",
        data: `Image link: ${file.path}`,
      },
    });
  } catch (error) {
    console.log(error);
    next(errorCreator(500, "Internal server error"));
  }
}
