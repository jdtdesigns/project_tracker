const router = require('express').Router();
const user_controller = require('../controllers/user_controller');

// AUTHENTICATION

// Register
router.post('/register', user_controller.registerUser);

// Login
router.post('/login', user_controller.loginUser);

module.exports = router;