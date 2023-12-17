import mongoose from "mongoose";
import { UserModel } from "../models/userModel.js";
import { ChatModel } from "../models/chatModel.js";
import { MessageModel } from "../models/messageModel.js";
import { config } from "dotenv";
config({ path: "../.env" });

console.log(process.env.DB_CONNECTION_STRING);

async function populateDatabase() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      dbName: "ChatApp",
    });

    // Create a user
    const user = await UserModel.create({
      email: "test1@mail.com",
      username: "testUser1",
      password: "Password12",
    });

    // Create a chat
    const chat = await ChatModel.create({
      name: "Test Chat",
      members: [user._id],
      messages: [], // Empty for now
    });

    // Create a message
    const message = await MessageModel.create({
      text: "Hello, this is the second test message",
      sender: user._id,
    });

    // Add the message to the chat's messages array
    chat.messages.push(message._id);

    // Save the chat again to update the messages array
    await chat.save();

    console.log("Database populated successfully");
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    mongoose.connection.close();
  }
}

populateDatabase();
