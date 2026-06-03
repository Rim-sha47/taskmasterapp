const express = require("express");
const cors = require("cors");

const testRoute = require("./routes/testRoute");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const calendarRoutes = require("./routes/calendarRoutes");
const teamRoutes = require("./routes/teamRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const searchRoutes = require("./routes/searchRoutes");
const profileRoutes =
  require("./routes/profileRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("TaskMaster API Running");
});

// API Routes
app.use("/api", testRoute);

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/calendar", calendarRoutes);

app.use("/api/team", teamRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/settings", settingsRoutes);

app.use("/api/search", searchRoutes);
app.use(
  "/api/profile",
  profileRoutes
);
module.exports = app;