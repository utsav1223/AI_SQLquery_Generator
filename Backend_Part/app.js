const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth.routes");
const queryRoutes = require("./routes/query.routes");
const aiRoutes = require("./routes/ai.routes");
const schemaRoutes = require("./routes/schema.routes");


const paymentRoutes = require("./routes/payment.routes");
const app = express();

// // Security headers
// app.use(helmet());

// // CORS
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// // Body parser
// app.use(express.json());

// // Rate limiter (auth protection)
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 10,
//   message: "Too many requests. Please try again later."
// });

// app.use("/api/schema", schemaRoutes);
// app.use("/api/ai", aiRoutes);
// app.use("/api/query", queryRoutes);
// app.use("/api/auth", authLimiter);
// app.use("/api/payment", paymentRoutes);


// // Passport
// app.use(passport.initialize());

// // Routes
// app.use("/api/auth", authRoutes);

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });







app.use(helmet());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(passport.initialize());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests. Please try again later."
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/schema", schemaRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/query", queryRoutes);


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});



// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong on the server"
  });
});

module.exports = app;
