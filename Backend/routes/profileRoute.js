import { Router } from "express";
import multer from "multer";
import {
  changePasswordPutController,
  profileGetController,
  uploadProfileImgPostController,
} from "../controllers/profileController.js";
import { jwtVerifier } from "../middlewares/jwt/jwtVerifier.js";

export const profileRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profileImgs");
  },
  filename: function (req, file, cb) {
    const username = req.user.username;
    cb(null, username + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

profileRouter.get("/", jwtVerifier, profileGetController);

profileRouter.put("/change-password", jwtVerifier, changePasswordPutController);

profileRouter.post(
  "/upload",
  jwtVerifier,
  upload.single("profileImg"),
  uploadProfileImgPostController
);
