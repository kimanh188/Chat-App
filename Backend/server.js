import express, { json } from "express";
import { config } from "dotenv";
import {
  mongoConnect,
  mongoConnectListener,
  mongoDisconnectListener,
  mongoErrorListener,
} from "./configs/db.connect.js";
config();

mongoErrorListener();
mongoConnectListener();
mongoDisconnectListener();
await mongoConnect();

const app = express();
app.use(json());

app.use((error, req, res, next) => {
  res.status(error.code || 500).json({
    answer: {
      code: error.code || 500,
      message: error.message || "Internal server error",
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
