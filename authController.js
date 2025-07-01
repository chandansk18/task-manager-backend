const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const SECRET_KEY = "your_secret_key"; // Change to env in production

// Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  db.query(query, [name, email, hashedPassword], (err, result) => {
    if (err) 
      return res.status(500).json({ error: "User already exists or DB error." });

    res.status(201).json({ message: "User registered successfully!" });
  });
};

// Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;
  db.query(query, [email], async (err, results) => {
    if (err) 
      return res.status(500).json({ error: "Database error" });
    
    if (results.length === 0) 
      return res.status(404).json({ error: "User not found" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) 
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    
    res.cookie('accessToken',  token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    res.json({ message: "Login successful" });
  });
};

exports.logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};


exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  const query = `SELECT password FROM users WHERE id = ?`;
  db.query(query, [userId], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = results[0];
    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) return res.status(401).json({ error: 'Current password is incorrect' });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updateQuery = `UPDATE users SET password = ? WHERE id = ?`;
    db.query(updateQuery, [hashedNewPassword, userId], (err) => {
      if (err) return res.status(500).json({ error: 'Update failed' });

      res.json({ message: 'Password updated successfully' });
    });
  });
};
