import Router from "express";
import {
  getAllMessagesController,
  getAConversationController,
} from "../controllers/chatController.js";
import { jwtVerifier } from "../middlewares/jwt/jwtVerifier.js";

export const chatRouter = Router();

chatRouter.get("/", jwtVerifier, getAllMessagesController);

chatRouter.get("/:id", jwtVerifier, getAConversationController);
