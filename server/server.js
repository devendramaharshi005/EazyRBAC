require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // Replace with your React app's URL in production

// Middleware to parse JSON with validation
app.use(
  express.json({
    verify: (req, res, buf, encoding) => {
      try {
        JSON.parse(buf);
      } catch (err) {
        throw new SyntaxError("Invalid JSON format");
      }
    },
  })
);

// Error handler for invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.message.includes("JSON")) {
    return res.status(400).json({ error: "Invalid JSON input" });
  }
  next(err); // Pass other errors to the next middleware
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the demo RBAC!" });
});

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
