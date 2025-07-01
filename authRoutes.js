const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken'); // ✅ correct path


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.put('/change-password', verifyToken, authController.changePassword);


module.exports = router;
