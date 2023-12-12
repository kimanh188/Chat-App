import { validationResult } from "express-validator";

export const validation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(400).json({
      answer: {
        code: 400,
        errors: errors.array(),
      },
    });
  }
};
