import { Router } from "express";
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

userRouter.post(
  "/register",
  emailValidation,
  usernameValidation,
  passwordValidation,
  validation,
  jwtCreator,
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
