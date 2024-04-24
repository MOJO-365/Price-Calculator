const express = require("express");
const mongo = require("mongoose");
const cors = require("cors");


const body_parser = require("body-parser");



const Question = require("./models/QuestionsSchema");

const questionRoutes = require("../Price-Calculator/routes/QuestionsRoutes");

require("dotenv").config();

const app = express();
app.use(body_parser.json());
app.use(cors());

mongo.connect(process.env.DATABASE_CONNECTION_URL);
mongo.connection.on("error", (err) => {
  console.error("Database connection error:", err);
});

// Handle successful connection
mongo.connection.once("open", () => {
  console.log("Connected to MongoDB");
});


app.use("/questions", questionRoutes);



app.listen(process.env.PORT, () => {
  console.log("Server running.....");
});
