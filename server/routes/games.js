// modules required for routing
let express = require('express');
let router = express.Router();

// require the games controller
let gamesController = require('../controllers/games');
// require the users controller
let usersController = require('../controllers/users');

// require authentication for all pages
router.use(usersController.RequireAuth);

/* GET games List page. */
router.get('/', gamesController.DisplayGames);

/**
 * GET: Display Game Details page in order to add a new Game
 * POST: Process the Game creation
 */
router.get('/add', gamesController.DisplayAdd)
  .post('/add', gamesController.AddGame);


/**
 * GET: Display the Game Details page in order to edit a Game
 * POST: Process the information passed from the details form and update the document
 */
router.get('/:id', gamesController.DisplayDetails)
  .post('/:id', gamesController.EditGame);

/* GET - process the delete by user id */
router.get('/delete/:id', gamesController.DeleteGame);

module.exports = router;
