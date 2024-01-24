import { Router } from "express";
import { searchForUsers } from "../controllers/searchController.js";

export const searchRouter = Router();

searchRouter.post("/", searchForUsers);
