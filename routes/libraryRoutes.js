const express = require('express');
const routes = express.Router();
const libraryController = require('../controllers/libraryController');
const authMiddleware = require('../middleware/authMiddleware');

routes.use(authMiddleware);

// Get my library
routes.get('/my-library', libraryController.getMyLibrary);
// Add game to library
routes.post('/add-game', libraryController.addGameToLibrary);
// Update progress of a game in library
routes.put('/update-game', libraryController.updateGameProgress);
// Remove game from library
routes.delete('/remove-game/:gameId', libraryController.removeGameFromLibrary);

module.exports = routes;