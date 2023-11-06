const express = require("express");
require('dotenv').config();
const { connectToMongoDB } = require("./connection");
var cookieParser = require('cookie-parser')
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const cors = require('cors');

const resourceRoute = require("./routes/resource");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8000;

connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/resourcesharing").then(() =>
  console.log("Mongodb connected")
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/resource", restrictToLoggedinUserOnly, resourceRoute);
app.use("/user", userRoute);
// app.use("/", checkAuth, staticRoute);
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));