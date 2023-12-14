import jwt from "jsonwebtoken";
import { errorCreator } from "../../lib/errorCreator.js";
import { UserModel } from "../../models/userModel.js";

export const jwtVerifier = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new Error("Token not provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECURITY_KEY);

    const { email } = decoded;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      next(errorCreator(404, "User not found"));
    }
    req.user = user;

    next();
  } catch (error) {
    console.log("Token verification failed ", error.message);
    if (
      error.message === "Token not provided" ||
      error.message === "User not found"
    ) {
      res.clearCookie("jwt"); //preventing further access until the user logs in again
      res.redirect("/user/login"); //redirect to login page
    }

    next(errorCreator(401, "Not authorized"));
  }
};
