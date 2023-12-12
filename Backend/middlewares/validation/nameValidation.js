import { check } from "express-validator";

export const nameValidation = check("name")
  .isLength({ min: 3 })
  .escape()
  .trim()
  .withMessage("Name must be at least 3 characters long");
