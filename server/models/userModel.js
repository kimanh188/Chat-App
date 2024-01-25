import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    username: {
      type: String,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    profileImg: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.profileImg) {
    this.profileImg = "../uploads/user.png";
  }
  next();
});

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare password with hashed password in database
userSchema.methods.auth = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

export const UserModel = model("user", userSchema);
