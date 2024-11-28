class Task {
  constructor(id, title, description, ownerId, createdBy) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.ownerId = ownerId;
    this.status = "pending"; // Default status is "pending"
    this.createdAt = new Date(); // Track task creation
    this.createdBy = createdBy; // Track the user who created the task
    this.lastModifiedAt = null; // Track last modification time
    this.lastModifiedBy = null; // Track the user who modified the task
  }
}

module.exports = Task;
