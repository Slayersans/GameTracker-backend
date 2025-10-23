const express = require('express');
const routes = express.Router();
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middlewares/authMiddleware');

routes.use(authMiddleware);

routes.get('/', gameController.getAllGames);
routes.get('/:id', gameController.getGameById);
routes.post('/', gameController.addGame);
routes.put('/:id', gameController.updateGame);
routes.delete('/:id', gameController.deleteGame);

module.exports = routes;
