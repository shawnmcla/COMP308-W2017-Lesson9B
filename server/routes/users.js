// modules required for routing
let express = require('express');
let router = express.Router();

// require the users controller
let usersController = require('../controllers/users');

/**
 * GET: Display the login page
 * POST: Process the login attempt
 */
router.get('/login', usersController.DisplayLogin)
    .post('/login', usersController.ProcessLogin());

/**
 * GET: Display the register page
 * POST: Process the registration attempt
 */
router.get('/register', usersController.DisplayRegister)
    .post('/register', usersController.ProcessRegister);

// GET /logout - process the logout request
router.get('/logout', usersController.ProcessLogout);

module.exports = router;
