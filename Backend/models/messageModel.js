import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    chat: {
      type: Schema.Types.ObjectId,
      ref: "chat",
    },
  },
  {
    timestamps: true,
  }
);

export const MessageModel = model("message", messageSchema);
