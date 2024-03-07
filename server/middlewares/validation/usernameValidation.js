import { check } from "express-validator";

export const usernameValidation = check("username")
  .isLength({ min: 3 })
  .escape()
  .trim()
  .matches(/^[a-zA-Z0-9]+$/) // only letters and numbers, no special characters or spaces
  .withMessage(
    "Username must be at least 3 characters long and contain only letters and numbers."
  );
