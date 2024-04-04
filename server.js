const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// env config
dotenv.config();

// routes
const userRoutes = require("./routes/userRoutes.js");
const blogRoutes = require("./routes/blogRoutes");

// mongodb connection
connectDB();

// rest object
const app = express();

// middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// PORT process.env.PORT ||
const PORT = 8080;
// listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} PORT ${PORT}`.bgCyan.white
  );
});
