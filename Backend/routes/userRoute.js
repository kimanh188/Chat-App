import { Router } from "express";
import multer from "multer";
import {
  loginPostController,
  logoutPostController,
  registerPostController,
} from "../controllers/userController.js";
import { emailValidation } from "../middlewares/validation/emailValidation.js";
import { usernameValidation } from "../middlewares/validation/usernameValidation.js";
import { passwordValidation } from "../middlewares/validation/passwordValidation.js";
import { validation } from "../middlewares/validation/validation.js";
import { jwtCreator } from "../middlewares/jwt/jwtCreator.js";

export const userRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profileImgs");
  },
  filename: function (req, file, cb) {
    const username = req.user.username;
    cb(null, username + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

userRouter.post(
  "/register",
  emailValidation,
  usernameValidation,
  passwordValidation,
  validation,
  jwtCreator,
  upload.single("profileImg"),
  registerPostController
);

userRouter.post(
  "/login",
  emailValidation,
  validation,
  jwtCreator,
  loginPostController
);

userRouter.post("/logout", logoutPostController);
