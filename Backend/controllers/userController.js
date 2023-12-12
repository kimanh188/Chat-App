export function signUpPostController(req, res, next) {
  res.status(200).json({
    answer: {
      code: 200,
      message: "Sign up",
    },
  });
}

export function signInGetController(req, res, next) {
  res.status(200).json({
    answer: {
      code: 200,
      message: "Sign in",
    },
  });
}
