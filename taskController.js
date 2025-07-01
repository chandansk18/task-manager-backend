const Task = require('../models/taskModel');
const { taskSchema } = require('../validators/taskValidator');

// GET all tasks
exports.getAllTasks = (req, res) => {
  Task.getTasks((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// CREATE a task (with Joi validation)
exports.createTask = (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name } = req.body;

  Task.addTask(name, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name });
  });
};

// UPDATE a task ( Add Joi validation here)
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name } = req.body;

  Task.updateTask(id, name, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, name });
  });
};

// DELETE a task
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  Task.deleteTask(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task deleted' });
  });
};
