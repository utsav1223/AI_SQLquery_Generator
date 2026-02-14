const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
// require("dotenv").config();

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);

module.exports = app;
