import express, { json } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  mongoConnect,
  mongoConnectListener,
  mongoDisconnectListener,
  mongoErrorListener,
} from "./configs/db.connect.js";
import { userRouter } from "./routes/userRoute.js";
import { profileRouter } from "./routes/userProfileRoute.js";
import { messageRouter } from "./routes/messageRoute.js";
import { searchRouter } from "./routes/searchRoute.js";
config();

import { Server } from "socket.io";

mongoErrorListener();
mongoConnectListener();
mongoDisconnectListener();
await mongoConnect();

const app = express();
app.use(json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3023",
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/user/profile", profileRouter);
app.use("/chat", messageRouter);
app.use("/search", searchRouter);

app.use("/uploads", express.static("uploads"));

app.all("*", (req, res, next) => {
  res.status(404).json({
    answer: {
      code: 404,
      message: "Page not found",
    },
  });
});

app.use((error, req, res, next) => {
  res.status(error.code || 500).json({
    answer: {
      code: error.code || 500,
      message: error.message || "Internal server error",
    },
  });
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3023",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected " + socket.id);

  socket.on("setup", (conversationKey) => {
    socket.join(conversationKey);
    console.log(conversationKey);
    socket.emit("connected");
  });

  socket.on("joinChat", (room) => {
    socket.join(room);
    console.log("user joined conversation: " + room);
  });

  socket.on("sendMessage", (message, room) => {
    socket.to(room).emit("receiveMessage", message);
    console.log("message: " + message + " send to room: " + room);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
