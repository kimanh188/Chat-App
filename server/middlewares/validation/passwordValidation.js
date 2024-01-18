import { check } from "express-validator";

export const passwordValidation = check("password")
  .matches(/^(?=.*[A-Z]).{8,}$/)
  .escape()
  .trim()
  .withMessage(
    "Password must be at least 8 characters long and contain at least one uppercase letter"
  );
