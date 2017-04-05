// modules required for routing
let express = require('express');
let router = express.Router();

// require the index controller
let indexController = require('../controllers/index');

/* GET: Display home page. */
router.get('/', indexController.DisplayHome);

/* GET: Display contact page. */
router.get('/contact', indexController.DisplayContact);

module.exports = router;
