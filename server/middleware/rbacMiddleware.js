const roles = require("../roles/userRolesConfig");

function checkPermission(authorizedActions, resource = null) {
  return (req, res, next) => {
    const userRole = req.user.role; // Assume req.user is populated after authentication

    // Check if the role exists in the roles configuration
    if (!roles[userRole]) {
      return res.status(403).json({ message: "Access denied: Role not recognized" });
    }

    // Get the user's allowed actions from their role
    const userPermissions = roles[userRole];

    // Check if the user has at least one of the authorized actions
    const hasPermission = authorizedActions.some((action) =>
      userPermissions.includes(action)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: "Access denied: Insufficient permissions" });
    }

    // Optional: Additional resource-specific ownership checks
    if (resource) {
      const userResourceId = req.user.id; // Assume the user's ID is available
      const resourceOwnerId = req.body.ownerId || req.params.ownerId; // Assume resource owner ID is in the request
      
      // If any of the authorized actions are "own" type, verify ownership
      const ownActions = authorizedActions.filter((action) => action.endsWith("_own"));
      if (ownActions.length > 0 && userResourceId !== resourceOwnerId) {
        return res.status(403).json({ message: "Access denied: Not the owner of this resource" });
      }
    }

    next(); // User has sufficient permission
  };
}

module.exports = checkPermission;
