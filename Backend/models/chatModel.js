import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
      },
    ],

    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "MessageModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ChatModel = model("chat", chatSchema);
