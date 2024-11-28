const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(5).max(255).required(),
});


const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(50),
  description: Joi.string().min(5).max(255),
  status: Joi.string().valid("pending", "completed"), // Validate task status
});

const taskIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
};
