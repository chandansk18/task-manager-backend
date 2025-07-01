const db = require('./db');

exports.getTasks = (callback) => {
  db.query('SELECT * FROM tasks', callback);
};

exports.addTask = (name, callback) => {
  db.query('INSERT INTO tasks (name) VALUES (?)', [name], callback);
};

exports.updateTask = (id, name, callback) => {
  db.query('UPDATE tasks SET name = ? WHERE id = ?', [name, id], callback);
};

exports.deleteTask = (id, callback) => {
  db.query('DELETE FROM tasks WHERE id = ?', [id], callback);
};
