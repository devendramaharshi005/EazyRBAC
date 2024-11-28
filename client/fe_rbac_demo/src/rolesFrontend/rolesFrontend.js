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
export default roles;
