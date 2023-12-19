import mongoose from "mongoose";
import { MessageModel } from "../models/messageModel.js";
import { UserModel } from "../models/userModel.js";
import { errorCreator } from "../lib/errorCreator.js";

export async function getAllConversationController(req, res, next) {
  try {
    // Access user information from req object
    const thisUserId = req.user._id;
    const userName = req.user.username;
    console.log("This User: " + userName + ", Id:" + thisUserId);
    const thisUserIdObject = new mongoose.Types.ObjectId(thisUserId);

    // Retrieve all messages of the user
    const allMessages = await MessageModel.find({
      $or: [{ sender: thisUserId }, { recipient: thisUserId }],
    }).sort({ createdAt: -1 });

    if (!allMessages || allMessages.length === 0) {
      return res.status(400).json({
        answer: {
          code: 400,
          message: "You don't have any conversation yet",
        },
      });
    }

    //Retrieve all usersIds that this user has chatted with
    const otherUsersIds = [];

    allMessages.forEach((message) => {
      const senderIdString = message.sender.toString();
      const recipientIdString = message.recipient.toString();

      if (
        message.sender.equals(thisUserIdObject) &&
        !otherUsersIds.includes(recipientIdString)
      ) {
        otherUsersIds.push(recipientIdString);
      } else if (
        message.recipient.equals(thisUserIdObject) &&
        !otherUsersIds.includes(senderIdString)
      ) {
        otherUsersIds.push(senderIdString);
      }
    });
    //console.log("Other userIds that thisUser has chatted with:  " + otherUsersIds);

    // Retrieves otherUsers with their username based on the otherUsersIds
    const otherUsers = [];

    for (const userId of otherUsersIds) {
      const user = await UserModel.findById(userId).select("username");
      otherUsers.push(user);
    }
    //console.log("Other users that thisUser has chatted with: " + otherUsers);

    // Create a map to track conversations based on sender and recipient combinations
    const conversationMap = new Map();

    allMessages.forEach((message) => {
      const otherUserId = message.sender.equals(thisUserIdObject)
        ? message.recipient
        : message.sender;

      const conversationKey = `${otherUserId}-${thisUserId}`;
      //console.log("Conversation key: " + conversationKey);

      // If the conversation doesn't exist for this pair, create a new one
      if (!conversationMap.has(conversationKey)) {
        conversationMap.set(conversationKey, []);
      }

      // Add the message to the corresponding conversation
      conversationMap.get(conversationKey).push(message);
    });
    //console.log(conversationMap);

    // Iterate over the conversation map and return the final list of conversations as an array of objects
    const conversations = Array.from(conversationMap.entries()).map(
      ([conversationKey, messages]) => {
        const participantIds = conversationKey.split("-");
        //console.log("ParticipantIds: " + participantIds);
        const otherUserId = participantIds.find((id) => id !== thisUserId);
        //console.log("OtherUserId: " + otherUserId);

        const otherUser = otherUsers.find(
          (user) => user._id.toString() === otherUserId
        );

        const conversationName = otherUser ? otherUser.username : "Unknown";

        return { conversationName, messages };
      }
    );
    //console.log(conversations);

    // Log messages grouped by conversation
    conversations.forEach((conversation) => {
      console.log(`Conversation: ${conversation.conversationName}`);
      conversation.messages.forEach((message) => {
        console.log(message.message);
      });
    });

    res.status(200).json({
      answer: {
        code: 200,
        message: `All conversations of ${userName} retrieved`,
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
          message:
            "Sorry, for now you can't chat with yourself 😅 I'll update this feature in the future.",
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

    if (conversation.length === 0) {
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
