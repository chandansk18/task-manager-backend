// validators/taskValidator.js
const Joi = require("joi");

const taskSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  completed: Joi.boolean().default(false),
});

module.exports = { taskSchema };
