import mongoose from "mongoose";

export async function mongoConnect() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      dbName: "ChatApp",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("An error occurred: " + error);
  }
}

export function mongoErrorListener() {
  mongoose.connection.on("error", (error) => {
    console.log("An error occurred: " + error);
  });
}

export function mongoConnectListener() {
  mongoose.connection.on("connected", () => {
    console.log("Connection established");
  });
}

export function mongoDisconnectListener() {
  mongoose.connection.on("disconnected", () => {
    console.log("Connection interrupted");
  });
}

export async function mongoConnectionClose() {
  try {
    await mongoose.connection.close();
    console.log("Connection closed");
  } catch (error) {
    console.log("An error occurred: " + error);
  }
}
