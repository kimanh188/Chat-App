import { config } from "dotenv";
config({
  path: "../.env",
});

import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { MessageModel } from "../models/messageModel.js";
import { UserModel } from "../models/userModel.js";
import { mongoConnect } from "../configs/db.connect.js";

console.log("MongoDB String:", process.env.DB_CONNECTION_STRING);

await mongoConnect();

console.log("Creating messages...");

// Function to get a random user ObjectId from the database
const getRandomUserObjectId = async () => {
  const users = await UserModel.find({}, "_id"); // Fetch all user ObjectId values

  // Pick a random user ObjectId
  const randomUser = users[Math.floor(Math.random() * users.length)];
  return randomUser._id;
};

async function createMessages(docsToCreate) {
  try {
    for (let i = 0; i < docsToCreate; i++) {
      const sender = await getRandomUserObjectId();
      const recipient = await getRandomUserObjectId();

      await MessageModel.create({
        sender: sender,
        recipient: recipient,
        message: faker.lorem.sentence(),
      });
    }
    console.log("Messages created");
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

await createMessages(3);
