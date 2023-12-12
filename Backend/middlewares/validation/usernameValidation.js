import { check } from "express-validator";

export const usernameValidation = check("username")
  .isLength({ min: 3 })
  .escape()
  .trim()
  .withMessage("Username must be at least 3 characters long");
