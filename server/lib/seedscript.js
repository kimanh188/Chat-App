import { config } from "dotenv";
config({
  path: "../.env",
});

import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { MessageModel } from "../models/messageModel.js";
import { UserModel } from "../models/userModel.js";
import { mongoConnect } from "../configs/db.connect.js";

await mongoConnect();

console.log("Connected to DB...");

const createUsers = async (usersToCreate) => {
  try {
    for (let i = 0; i < usersToCreate; i++) {
      await UserModel.create({
        email: faker.internet.email(),
        username: faker.person.firstName(),
        password: faker.internet.password({ length: 8 }, { uppercase: true }),
      });
    }
    console.log("Users created");
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
};

// Function to get a random user ObjectId from the database
const getRandomUser = async () => {
  const allUsernames = await UserModel.find({}, "username"); // Fetch all user objects containing only the username

  // Pick a random user ObjectId
  const randomUser =
    allUsernames[Math.floor(Math.random() * allUsernames.length)];
  return randomUser.username;
};

const createMessages = async (docsToCreate) => {
  try {
    for (let i = 0; i < docsToCreate; i++) {
      let sender = await getRandomUser();

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
};

//await createUsers(5);
await createMessages(20);

/* const deleteAllMessages = async () => {
  try {
    await MessageModel.deleteMany({});
    console.log("All messages deleted");
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
};

await deleteAllMessages(); */
