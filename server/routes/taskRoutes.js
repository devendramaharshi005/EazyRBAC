const express = require("express");
const tasks = require("../models/taskList");
const Task = require("../models/taskModel");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/rbacMiddleware");
const {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} = require("../validations/taskValidation");

const router = express.Router();

// Create Task
router.post(
  "/tasks",
  authenticate,
  authorize(["task:create_own"]),
  async (req, res) => {
    try {
      const { title, description } = await createTaskSchema.validateAsync(
        req.body
      );

      const newTask = new Task(
        tasks.length + 1,
        title,
        description,
        req.user.id,
        req.user.username
      );
      tasks.push(newTask);

      res.status(201).json({
        message: "Task created successfully",
        task: newTask,
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Validation failed", error: err.message });
    }
  }
);

// Get All Tasks (Admin and Moderator)
router.get("/tasks", authenticate, authorize(["task:read_any"]), (req, res) => {
  res.json(tasks);
});

// Get User's Own Tasks
router.get(
  "/tasks/own",
  authenticate,
  authorize(["task:read_own"]),
  (req, res) => {
    const userTasks = tasks.filter((task) => task.ownerId === req.user.id);
    res.json(userTasks);
  }
);

// Update Task
router.put("/tasks/:id", authenticate, async (req, res) => {
  try {
    const { id } = await taskIdSchema.validateAsync(req.params);
    const taskId = parseInt(id, 10);

    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    console.log(req.user.scopes, "scopes");
    // Check permissions
    if (
      (task.ownerId !== req.user.id &&
        !req.user.scopes.includes("task:update_any")) ||
      (task.ownerId === req.user.id &&
        !req.user.scopes.includes("task:update_own"))
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Validate Task Updates
    const updates = await updateTaskSchema.validateAsync(req.body);

    // Apply updates
    if (updates.title) task.title = updates.title;
    if (updates.description) task.description = updates.description;
    if (updates.status) task.status = updates.status;

    // Update modification metadata

    task.lastModifiedAt = new Date();
    task.lastModifiedBy = req.user.username + " (" + req.user.role + " )";

    res.json({ message: "Task updated successfully", task });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Validation failed", error: err.message });
  }
});

// Delete Task
router.delete("/tasks/:id", authenticate, async (req, res) => {
  try {
    // Validate Task ID
    const { id } = await taskIdSchema.validateAsync(req.params);
    const taskId = parseInt(id, 10);

    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    const task = tasks[taskIndex];

    // Check permissions
    if (
      (task.ownerId !== req.user.id &&
        !req.user.scopes.includes("task:delete_any")) ||
      (task.ownerId === req.user.id &&
        !req.user.scopes.includes("task:delete_own"))
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Delete Task
    tasks.splice(taskIndex, 1);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Validation failed", error: err.message });
  }
});

module.exports = router;
