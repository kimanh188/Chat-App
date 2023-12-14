import { Router } from "express";
import {
  loginGetController,
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

userRouter.get(
  "/login",
  emailValidation,
  validation,
  jwtCreator,
  loginGetController
);

userRouter.post("/logout", logoutPostController);
