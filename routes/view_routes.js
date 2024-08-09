const router = require('express').Router();
const view_controller = require('../controllers/view_controller');
const { redirectGuest, redirectUser } = require('./helpers');

// Homepage Route
router.get('/', redirectUser, view_controller.showHomepage);

// Register Route
router.get('/register', redirectUser, view_controller.showRegisterPage);

// Login Route
router.get('/login', redirectUser, view_controller.showLoginPage);

// Dashboard Route
router.get('/dashboard', redirectGuest, view_controller.showDashboardPage);

module.exports = router;