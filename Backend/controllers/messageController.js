import mongoose from "mongoose";
import { MessageModel } from "../models/messageModel.js";
import { errorCreator } from "../lib/errorCreator.js";

export async function getAllConversationController(req, res, next) {
  try {
    // Access user information from req object
    const thisUserId = req.user._id;
    console.log(thisUserId);
    const userName = req.user.username;
    console.log(userName);

    // Retrieve all conversations of the user
    const allMessages = await MessageModel.find({
      $or: [{ sender: thisUserId }, { recipient: thisUserId }],
    }).sort({ createdAt: -1 });
    allMessages.forEach((message) => {
      console.log(message.message);
    });

    if (!allMessages || allMessages.length === 0) {
      return res.status(400).json({
        answer: {
          code: 400,
          message: "No messages found",
        },
      });
    }

    res.status(200).json({
      answer: {
        code: 200,
        message: `All messages of ${userName} retrieved`,
        data: allMessages,
      },
    });
  } catch (error) {
    console.log(error);
    next(errorCreator(500, "Error retrieving messages"));
  }
}

export async function getAConversationController(req, res, next) {
  try {
    // Access user information from req object
    const thisUserId = req.user._id;
    console.log(thisUserId);

    const { ObjectId } = mongoose.Types;
    const selectedUserId = new ObjectId(req.params.id);
    console.log(selectedUserId);

    if (thisUserId.equals(selectedUserId)) {
      return res.status(400).json({
        answer: {
          code: 400,
          message: "You can't chat with yourself",
        },
      });
    }

    if (!selectedUserId) {
      return res.status(400).json({
        answer: {
          code: 400,
          message: "No user found",
        },
      });
    }

    // Retrieve conversation with the specified user
    const conversation = await MessageModel.find({
      $or: [
        { sender: thisUserId, recipient: selectedUserId },
        { sender: selectedUserId, recipient: thisUserId },
      ],
    }).sort({ createdAt: -1 });
    console.log(conversation);

    if (!conversation) {
      //create new conversation
      const newConversation = await MessageModel.create({
        sender: thisUserId,
        recipient: selectedUserId,
        message: "Hi 👋",
      });
      await newConversation.save();

      return res.status(200).json({
        answer: {
          code: 200,
          message: "New conversation created",
          data: newConversation,
        },
      });
    } else {
      res.status(200).json({
        answer: {
          code: 200,
          message: "Retrieved conversation",
          data: conversation,
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(errorCreator(500, "Internal server error"));
  }
}
