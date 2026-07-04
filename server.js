const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const destinationRoutes = require("./routes/destinationRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const aiRoutes = require("./routes/aiRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const adventureRoutes = require("./routes/adventureRoutes");
const savedItemRoutes = require("./routes/savedItemRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/adventures", adventureRoutes);
app.use("/api/items", savedItemRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "TrippyGo API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Environment Loaded");
});

