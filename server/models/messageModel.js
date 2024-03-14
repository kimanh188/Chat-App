import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: String,
      ref: "user",
      field: "username",
    },
    recipient: {
      type: String,
      ref: "user",
      field: "username",
    },
    message: String,
    conversationKey: String,
  },
  {
    timestamps: true,
  }
);

export const MessageModel = model("message", messageSchema);
