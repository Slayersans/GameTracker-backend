const express = require('express');
const routes = express.Router();
const libraryController = require('../controllers/libraryController');
const authMiddleware = require('../middlewares/authMiddleware');

routes.use(authMiddleware);

// Get my library
routes.get('/', libraryController.getMyLibrary);
// Add game to library
routes.post('/', libraryController.addGameToLibrary);
// Update progress of a game in library
routes.put('/:gameId', libraryController.updateGameProgress);
// Remove game from library
routes.delete('/:gameId', libraryController.removeGameFromLibrary);

module.exports = routes;