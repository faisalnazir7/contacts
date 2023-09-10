const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("../src/routes/userRoute");
const contactRoute = require("../src/routes/contactRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api", contactRoute);

// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
  });

// Error Middleware
app.use(errorHandler)

// Connection to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server Running on port " + PORT);
    });
  })
  .catch((err) => console.log(err));