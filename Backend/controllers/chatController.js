import { ChatModel } from "../models/chatModel.js";
import { MessageModel } from "../models/messageModel.js";
import { errorCreator } from "../lib/errorCreator.js";

export async function getAllMessagesController(req, res, next) {
  try {
    const user = req.user;
    const userName = user.username;
    const userId = user._id;

    // Retrieve all messages from database
    const chats = await ChatModel.find({
      members: { $in: [userId] },
    })
      .populate({
        path: "messages",
        populate: {
          path: "sender",
          model: "UserModel",
          select: "username",
        },
      })
      .sort({ updatedAt: -1 });
    console.log(chats);

    const allMessages = [];

    chats.forEach((chat) => {
      allMessages.push(...chat.messages);
    });

    console.log(chats);

    if (allMessages.length === 0) {
      return res.status(200).json({
        answer: {
          code: 200,
          message: `No messages found for user ${userName}`,
        },
      });
    }

    res.status(200).json({
      answer: {
        code: 200,
        message: `All messages of user ${userName} retrieved`,
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
    // Access user information from req object (req.id, req.email, req.username)
    const thisUserId = req.user._id.toString();
    console.log(thisUserId);
    const selectedUserId = req.params.id;
    console.log(selectedUserId);

    if (thisUserId === selectedUserId) {
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
    const conversation = await ChatModel.findOne({
      isGroup: false,
      members: { $all: [thisUserId, selectedUserId] },
    }).sort({ createdAt: -1 });
    console.log(conversation);

    if (!conversation) {
      //create new conversation
      const newConversation = await ChatModel.create({
        isGroup: false,
        members: [thisUserId, selectedUserId],
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
