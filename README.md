# 🚀 Task Manager Backend

A secure, JWT-authenticated backend built with **Node.js**, **Express**, and **MySQL** for managing user registration, login, and task data.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white)

---

## ✨ Features

- 🔐 Secure authentication using **JWT** and **Cookies**
- 🔒 Password hashing using **bcrypt**
- 🔁 Change Password functionality
- 🔓 Protected routes via custom middleware
- 📁 Modular folder structure (MVC-style)

---

## 📁 Folder Structure

```bash
task-manager-backend/
│
├── controllers/       # Logic for routes (e.g., authController.js)
├── routes/            # API routes (e.g., authRoutes.js)
├── middleware/        # JWT verification
├── config/            # MySQL DB connection
├── .env.example       # Example environment file
├── app.js             # Entry point
├── package.json
└── README.md
