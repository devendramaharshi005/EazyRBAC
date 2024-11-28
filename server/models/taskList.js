// const tasks = []; // In-memory task storage (array of Task objects)

// const Task = require("./taskModel");

// Sample tasks array
const tasks = [
  {
    id: 1,
    title: "Fix server issues",
    description: "Resolve downtime issues on the backend",
    ownerId: 1,
    status: "pending",
    createdAt: "2024-11-28T05:58:32.154Z",
    createdBy: "testuser5@gmail.com",
    lastModifiedAt: null,
    lastModifiedBy: null,
  },
  {
    id: 2,
    title: "Deploy frontend",
    description: "Deploy the latest build of the React app",
    ownerId: 1,
    status: "pending",
    createdAt: "2024-11-28T06:00:10.509Z",
    createdBy: "testuser5@gmail.com",
    lastModifiedAt: null,
    lastModifiedBy: null,
  },
  {
    id: 3,
    title: "Submit project",
    description: "Upload the final version of the app",
    ownerId: 3,
    status: "pending",
    createdAt: "2024-11-28T06:03:43.991Z",
    createdBy: "aditya@gmail.com",
    lastModifiedAt: null,
    lastModifiedBy: null,
  },
  {
    id: 4,
    title: "Review user reports",
    description: "Moderate flagged comments",
    ownerId: 4,
    status: "pending",
    createdAt: "2024-11-28T06:04:35.871Z",
    createdBy: "testuser4@gmail.com",
    lastModifiedAt: null,
    lastModifiedBy: null,
  },
  {
    id: 5,
    title: "Resolve tickets",
    description: "Respond to customer support tickets",
    ownerId: 4,
    status: "pending",
    createdAt: "2024-11-28T06:07:10.952Z",
    createdBy: "testuser4@gmail.com",
    lastModifiedAt: null,
    lastModifiedBy: null,
  },
  {
    id: 6,
    title: "Update profile",
    description: "Change profile picture and details",
    ownerId: 2,
    status: "completed",
    createdAt: "2024-11-28T06:09:52.156Z",
    createdBy: "testuser3@gmail.com",
    lastModifiedAt: "2024-11-28T06:13:01.887Z",
    lastModifiedBy: "testuser3@gmail.com (user )",
  },
  {
    id: 7,
    title: "Write blog post",
    description: "Draft and publish a blog post on the site",
    ownerId: 3,
    status: "pending",
    createdAt: "2024-11-28T06:12:23.532Z",
    createdBy: "aditya@gmail.com",
    lastModifiedAt: null,
    lastModifiedBy: null,
  },
];
module.exports = tasks;

// sample tasks
// ### Users Table

// | **Username**             | **Password**    | **Role**    |
// |--------------------------|-----------------|-------------|
// | aditya@gmail.com          | 123456          | user1       |
// | testuser3@gmail.com       | hello$123       | user2       |
// | testuser4@gmail.com       | hello$123       | moderator   |
// | testuser5@gmail.com       | hello$123       | admin       |

// ### Tasks Table
// | **Task ID** | **Task Title**         | **Task Description**                                       | **Assigned User (ID)** |
// |-------------|------------------------|------------------------------------------------------------|------------------------|
// | 1           | Fix server issues      | Resolve downtime issues on the backend                    | admin (User ID: 1)     |
// | 2           | Review user reports    | Moderate flagged comments                                  | moderator (User ID: 2) |
// | 3           | Submit project         | Upload the final version of the app                        | user1 (User ID: 3)     |
// | 4           | Update profile         | Change profile picture and details                         | user2 (User ID: 4)     |
// | 5           | Deploy frontend        | Deploy the latest build of the React app                   | admin (User ID: 1)     |
// | 6           | Write blog post        | Draft and publish a blog post on the site                  | user1 (User ID: 3)     |
// | 7           | Resolve tickets        | Respond to customer support tickets                        | moderator (User ID: 2) |
