const jwt = require("jsonwebtoken");
const userRoles = require("../roles/userRolesConfig");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const scopes = userRoles[decoded.role] || []; // Default to empty array if role is not found in the config

    req.user = {
      id: decoded.id,
      role: decoded.role,
      username : decoded.username,
      scopes: scopes, // Assign the appropriate scopes based on role
    };

    next();
  });
};

module.exports = authMiddleware;
