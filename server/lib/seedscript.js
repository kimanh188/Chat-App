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
const getRandomUser = async () => {
  const allUsernames = await UserModel.find({}, "username"); // Fetch all user objects containing only the username

  // Pick a random user ObjectId
  const randomUser =
    allUsernames[Math.floor(Math.random() * allUsernames.length)];
  return randomUser.username;
};

async function createMessages(docsToCreate) {
  try {
    for (let i = 0; i < docsToCreate; i++) {
      let sender = "testUser";

      let recipient = await getRandomUser();

      while (sender === recipient) {
        recipient = await getRandomUser();
      }

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
