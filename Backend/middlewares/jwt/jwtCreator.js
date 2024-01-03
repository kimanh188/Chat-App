import jwt from "jsonwebtoken";
import { config } from "dotenv";
config({ path: "../../.env" });

export const jwtCreator = (req, res, next) => {
  const payload = {
    email: req.body.email,
  };

  const secretKey = process.env.SECURITY_KEY;
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false, //secure: true, //only via HTTPS (set to false for localhost)
    sameSite: "None",
    maxAge: 3600000, // Validity period of the cookie (same time as expiry of the JWT token)
  });

  console.log(token);

  next();
};
