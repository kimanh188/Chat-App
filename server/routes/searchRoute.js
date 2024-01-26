import { Router } from "express";
import {
  searchForUsers,
  showAllUsers,
} from "../controllers/searchController.js";
import { jwtVerifier } from "../middlewares/jwt/jwtVerifier.js";

export const searchRouter = Router();

searchRouter.get("/", jwtVerifier, showAllUsers);
searchRouter.post("/", jwtVerifier, searchForUsers);
