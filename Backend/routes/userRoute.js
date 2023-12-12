import { Router } from "express";
import {
  signInGetController,
  signUpPostController,
} from "../controllers/userController.js";
import { emailValidation } from "../middlewares/validation/emailValidation.js";
import { usernameValidation } from "../middlewares/validation/usernameValidation.js";
import { passwordValidation } from "../middlewares/validation/passwordValidation.js";
import { validation } from "../middlewares/validation/validation.js";
import { jwtCreator } from "../middlewares/jwt/jwtCreator.js";

export const userRouter = Router();

userRouter.post(
  "/signup",
  emailValidation,
  usernameValidation,
  passwordValidation,
  validation,
  jwtCreator,
  signUpPostController
);

userRouter.get("/signin", emailValidation, validation, signInGetController);
