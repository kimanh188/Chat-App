import jwt from "jsonwebtoken";
import { errorCreator } from "../../lib/errorCreator.js";

export const jwtVerifier = (req, res, next) => {
  //console.log(req.headers);
  const token = req.cookies.jwt;
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.SECURITY_KEY);
    console.log("Token valid:", decoded);

    req.id = decoded.id;
    req.email = decoded.email;
    req.username = decoded.username;
    next();
  } catch (error) {
    console.log("Token verification failed ", error.message);
    res.clearCookie("jwt"); //preventing further access until the user logs in again
    //res.redirect("/user/login"); //redirect to login page
    next(errorCreator(401, "Not authorized"));
  }
};
