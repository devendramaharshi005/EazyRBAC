const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../models/userModel");

const {
  loginschema,
  registerschema,
} = require("../validations/authValidation");
const router = express.Router();

router.post("/login", async (req, res) => {
  let { username, password } = {};
  try {
    const value = await loginschema.validateAsync(req.body);
    username = value.username;
    password = value.password;
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Validation failed: Please check your input and try again.",
    });
  }

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ message: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid credentials" });

  // Generate a JWT token
  const token = jwt.sign(
    { id: user.id, role: user.role, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({
    token,
    user: { id: user.id, username: user.username, role: user.role },
    message: "Login successful",
  });
});

router.post("/register", async (req, res) => {
  let { username, password, role } = {};

  try {
    const value = await registerschema.validateAsync(req.body);
    username = value.username;
    password = value.password;
    role = value.role;
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Validation failed: Please check your input and try again.",
    });
  }

  // Check if the username already exists (case-sensitive check)
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user (mock database)
  const newUser = {
    id: users.length + 1, // Assuming the ID is generated based on the users array length
    username,
    password: hashedPassword,
    role,
  };

  users.push(newUser);

  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});

// // only for the testing purposes
// router.get("/get_all_users", async (req, res) => {
//   const user = users;

//   res.json({
//     user: user,
//     message: "Login successful",
//   });
// });

module.exports = router;
