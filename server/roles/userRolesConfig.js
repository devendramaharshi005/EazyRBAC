const user_permissions = [
  "task:create_own",
  "task:read_own",
  "task:update_own",
  "task:delete_own",
];

// An Admin and a moderator is also a user

const roles = {
  admin: [
    ...user_permissions,
    "task:create_any",
    "task:read_any",
    "task:update_any",
    "task:delete_any",
  ],
  moderator: [...user_permissions, "task:read_any", "task:update_any"],
  user: user_permissions,
};

module.exports = roles;

// create_any: Can create tasks for any user.
// read_any: Can read tasks created by any user.
// update_any: Can update tasks created by any user.
// delete_any: Can delete tasks created by any user.
// create_own: Can create tasks only for themselves.
// read_own: Can read only their own tasks.
// update_own: Can update only their own tasks.
// delete_own: Can delete only their own tasks.
