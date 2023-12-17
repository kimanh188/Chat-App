import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  {
    timestamps: true,
  }
);

export const MessageModel = model("message", messageSchema);
