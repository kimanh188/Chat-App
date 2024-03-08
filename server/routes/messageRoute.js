import Router from "express";
import {
  getAllConversationsController,
  getAConversationController,
  createMessageController,
} from "../controllers/messageController.js";
import { jwtVerifier } from "../middlewares/jwt/jwtVerifier.js";

export const messageRouter = Router();

messageRouter.get("/", jwtVerifier, getAllConversationsController);

messageRouter.get("/:username", jwtVerifier, getAConversationController);

messageRouter.post("/", jwtVerifier, createMessageController);
