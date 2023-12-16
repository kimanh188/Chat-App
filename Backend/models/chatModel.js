import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    isGroup: {
      type: Boolean,
      default: false,
    },

    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "message",
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ChatModel = model("chat", chatSchema);
