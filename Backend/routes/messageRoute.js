import Router from "express";
import {
  getAllConversationController,
  getAConversationController,
} from "../controllers/messageController.js";
import { jwtVerifier } from "../middlewares/jwt/jwtVerifier.js";

export const messageRouter = Router();

messageRouter.get("/", jwtVerifier, getAllConversationController);

messageRouter.get("/:id", jwtVerifier, getAConversationController);
