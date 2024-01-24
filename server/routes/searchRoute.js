import { Router } from "express";
import {
  searchForUsers,
  showAllUsers,
} from "../controllers/searchController.js";

export const searchRouter = Router();

searchRouter.get("/", showAllUsers);
searchRouter.post("/", searchForUsers);
