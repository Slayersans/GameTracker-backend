const Review = require('../models/Review');
const Game = require('../models/Game');

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('gameId');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error getting reviews', error: error.message });
    }
};

//get review by game ID
exports.getReviewsByGameId = async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId);
        if (!game) return res.status(404).json({ message: 'Game not found' });

        const reviews = await Review.find({ gameId: req.params.gameId });
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this game' });
        }
        res.status(200).json({ game, reviews });
    } catch (error) {
        res.status(500).json({ message: 'Error getting reviews', error: error.message });
    }
};

// Add a new review
exports.addReview = async (req, res) => {
    try {
        const game = await Game.findById(req.body.gameId);
        if (!game) return res.status(404).json({ message: 'Game not found' });

        const newReview = new Review (req.body);
        await newReview.save();
        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    } 
};