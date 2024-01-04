import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    message: String,
  },
  {
    timestamps: true,
  }
);

export const MessageModel = model("message", messageSchema);
