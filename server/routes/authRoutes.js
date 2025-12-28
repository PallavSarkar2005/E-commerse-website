const express = require('express');
const router = express.Router();
const { authUser, registerUser, logoutUser } = require('../controllers/authController');

// Register a new user.........
router.post('/register', registerUser);

// Login user..........
router.post('/login', authUser);

// Logout user..........
router.post('/logout', logoutUser);

module.exports = router;