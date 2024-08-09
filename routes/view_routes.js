const router = require('express').Router();
const view_controller = require('../controllers/view_controller');

// Homepage Route
router.get('/', view_controller.showHomepage);

// Register Route
router.get('/register', view_controller.showRegisterPage);

// Dashboard Route
router.get('/dashboard', view_controller.showDashboardPage);

module.exports = router;