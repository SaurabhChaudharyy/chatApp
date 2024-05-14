const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const app = express();
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require("./middleware/errorHandler");
dotenv.config();

connectDB();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({
    message: "this is the request",
  });
});

app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server is started on the PORT ${PORT}`.yellow.bold)
);
