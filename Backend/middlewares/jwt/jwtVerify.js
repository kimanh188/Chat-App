export const jwtVerify = (req, res, next) => {
  const token = req.cookies.jwt;

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
