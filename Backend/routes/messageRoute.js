import Router from "express";
import {
  getAllMessagesController,
  getAConversationController,
} from "../controllers/messageController.js";
import { jwtVerifier } from "../middlewares/jwt/jwtVerifier.js";

export const messageRouter = Router();

messageRouter.get("/", jwtVerifier, getAllMessagesController);

messageRouter.get("/:id", jwtVerifier, getAConversationController);
