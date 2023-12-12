import { Router } from "express";
import {
  signInGetController,
  signUpPostController,
} from "../controllers/userController.js";

export const userRouter = Router();

userRouter.post("/signup", signUpPostController);
userRouter.get("/signin", signInGetController);
