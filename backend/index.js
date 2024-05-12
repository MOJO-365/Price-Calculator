const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const body_parser = require("body-parser");


const Question = require("./models/QuestionsSchema");
const questionAndFlowRoutes = require("./routes/QuestionsAndFlowRoutes");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");

const app = express();
app.use(body_parser.json());
app.use(cookieParser());
app.use(cors());

//Connecting to DB
const connectionOptions = {
  // Adjust this value as needed
  serverSelectionTimeoutMS: 60000, // 60 seconds
};

const mongoUri = 'mongodb+srv://root:root@cluster0.mw0de2w.mongodb.net/pricing-calculator?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri, connectionOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/questions-and-flows", questionAndFlowRoutes)

app.listen(process.env.PORT||8000, () => {
  console.log("Server running.....");
});
