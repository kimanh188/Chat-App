import jwt from "jsonwebtoken";
import { config } from "dotenv";
config({ path: "../../.env" });

export const jwtCreator = (req, res, next) => {
  const payload = {
    id: req.id,
    email: req.email,
    username: req.username,
  };

  const secretKey = process.env.SECURITY_KEY;
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  req.jwt = token;

  next();
};
