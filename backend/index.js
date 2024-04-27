const express = require("express");
const mongo = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const body_parser = require("body-parser");


const Question = require("./models/QuestionsSchema");
const questionAndFlowRoutes = require("./routes/QuestionsAndFlowRoutes");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");

require("dotenv").config();

const app = express();
app.use(body_parser.json());
app.use(cookieParser());
app.use(cors());

//Connecting to DB
mongo.connect(process.env.DATABASE_CONNECTION_URL);
mongo.connection.on("error", (err) => {
  console.error("Database connection error:", err);
});

// Handle successful connection
mongo.connection.once("open", () => {
  console.log("Connected to MongoDB");
});


app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/questions-and-flows", questionAndFlowRoutes)

app.listen(process.env.PORT, () => {
  console.log("Server running.....");
});
