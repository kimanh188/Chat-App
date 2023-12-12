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
  const token = jwt.sign(payload, secretKey, { expiresIn: "30m" });

  //req.jwt = token;

  res.cookie("jwt", token, {
    httpOnly: true,
    /* secure: true, //only via HTTPS (set to false for localhost)
    sameSite: "Strict", // Protection against CSRF
    maxAge: 1800000, // Validity period of the cookie (same time as expiry of the JWT token) */
  });

  next();
};
