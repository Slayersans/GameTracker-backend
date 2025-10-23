const express = require('express');
const routes = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

routes.use(authMiddleware);

routes.get('/', reviewController.getAllReviews);
routes.get('/game/:gameId', reviewController.getReviewsByGameId);
routes.post('/', reviewController.addReview);
routes.put('/:id', reviewController.updateReview);
routes.delete('/:id', reviewController.deleteReview);

module.exports = routes;