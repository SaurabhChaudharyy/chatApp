const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const app = express();
dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send({
    message: "this is the request",
  });
});

app.use("/api/user", userRoutes);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server is started on the PORT ${PORT}`.yellow.bold)
);
