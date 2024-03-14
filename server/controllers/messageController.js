//import mongoose from "mongoose";
import { MessageModel } from "../models/messageModel.js";
import { UserModel } from "../models/userModel.js";
import { errorCreator } from "../lib/errorCreator.js";

export async function getAllConversationsController(req, res, next) {
  try {
    const thisUserName = req.user.username;

    const allMessages = await MessageModel.find({
      $or: [{ sender: thisUserName }, { recipient: thisUserName }],
    }).sort({ createdAt: -1 });

    if (!allMessages || allMessages.length === 0) {
      return res.status(400).json({
        answer: {
          code: 400,
          message: "You don't have any conversation yet",
        },
      });
    }

    const otherUsernames = [];
    allMessages.forEach((message) => {
      const sender = message.sender;
      const recipient = message.recipient;

      if (sender === thisUserName && !otherUsernames.includes(recipient)) {
        otherUsernames.push(recipient);
      } else if (
        recipient === thisUserName &&
        !otherUsernames.includes(sender)
      ) {
        otherUsernames.push(sender);
      }
    });

    const conversationMap = new Map();
    allMessages.forEach((message) => {
      const theOtherUsername =
        message.sender === thisUserName ? message.recipient : message.sender;

      const participantsSorted = [thisUserName, theOtherUsername].sort(); // Sort the participants alphabetically to avoid duplicates

      const conversationKey = participantsSorted.join("-");

      if (!conversationMap.has(conversationKey)) {
        conversationMap.set(conversationKey, []);
      }

      conversationMap.get(conversationKey).push(message);
    });

    const conversations = Array.from(conversationMap.entries()).map(
      ([conversationKey, messages]) => {
        const participants = conversationKey.split("-");
        const interlocutor = participants.find((name) => name !== thisUserName);
        const conversationName = interlocutor || "Unknown";
        return { conversationKey, conversationName, messages };
      }
    );

    res.status(200).json({
      answer: {
        code: 200,
        message: `All conversations of ${thisUserName} retrieved`,
        data: conversations,
      },
    });
  } catch (error) {
    console.log(error);
    next(errorCreator(500, "Error retrieving conversations"));
  }
}

export async function getAConversationController(req, res, next) {
  try {
    const thisUserName = req.user.username;

    const selectedUsername = req.params.username;

    const interlocutor = await UserModel.findOne({
      username: selectedUsername,
    });

    if (thisUserName === selectedUsername) {
      return res.status(400).json({
        answer: {
          code: 400,
          message:
            "Sorry, for now you can't chat with yourself 😅 I'll update this feature in the future.",
        },
      });
    }

    if (!interlocutor) {
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
        { sender: thisUserName, recipient: selectedUsername },
        { sender: selectedUsername, recipient: thisUserName },
      ],
    }).sort({ createdAt: 1 });

    if (conversation.length === 0) {
      const newMessage = await MessageModel.create({
        sender: thisUserName,
        recipient: selectedUsername,
        message: "Hi 👋",
      });
      await newMessage.save();

      return res.status(200).json({
        answer: {
          code: 200,
          message: "New conversation created",
          data: newMessage,
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

export async function createMessageController(req, res, next) {
  try {
    const { recipient, message } = req.body;
    const sender = req.user.username;

    if (!recipient || !message) {
      return res.status(400).json({
        answer: {
          code: 400,
          message: "Invalid data provided",
        },
      });
    }

    const newMessage = await MessageModel.create({
      sender,
      recipient,
      message,
      conversationKey: [sender, recipient].sort().join("-"),
    });

    res.status(201).json({
      answer: {
        code: 201,
        message: "Message created",
        data: newMessage,
      },
    });
  } catch (error) {
    console.log(error);
    next(errorCreator(500, "Error creating message"));
  }
}
