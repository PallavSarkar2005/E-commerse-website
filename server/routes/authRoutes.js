const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');

// Route for Registration.............
router.post('/register', registerUser);

// Route for Login...............
router.post('/login', loginUser);

// Route for getting user info...............
router.get('/me', getMe);

module.exports = router;