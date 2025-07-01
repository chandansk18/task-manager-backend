const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Add this line

// Middleware to parse JSON
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());


// Auth routes
app.use('/api/auth', authRoutes); // ✅ Register + Login → POST /api/auth/register

// Task routes
app.use('/tasks', taskRoutes); // Already present

// Fix the undefined PORT variable
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
