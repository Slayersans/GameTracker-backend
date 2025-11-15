const Review = require('../models/Review');
const Game = require('../models/Game');

// Get user reviews
exports.getAllReviews = async (req, res) => {
    try {
        const userId = req.user.user._id;
        const reviews = await Review.find({ userId }).populate("gameId", "title").populate("userId", "name");
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

        const reviews = await Review.find({ gameId: req.params.gameId }).populate("userId", "name");
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ game, message: 'No reviews found for this game' });
        }
        res.status(200).json({ game, reviews });
    } catch (error) {
        res.status(500).json({ message: 'Error getting reviews', error: error.message });
    }
};

//get reviews by game title
exports.getReviewsByGameTitle = async (req, res) => {
    try {
        const game = await Game.findOne({ title: req.params.title });
        if (!game) return res.status(404).json({ message: 'Game not found' });
        const reviews = await Review.find({ gameId: game._id }).populate("userId", "name");
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ game, message: 'No reviews found for this game' });
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

        const data = req.body;
        data.userId = req.user.user._id;
        const newReview = new Review(data);
        await newReview.save();
        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        if (review.userId.toString() !== req.user.user._id) {
            return res.status(403).json({ message: 'Unauthorized to update this review' });
        }
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        if (review.userId.toString() !== req.user.user._id) {
            return res.status(403).json({ message: 'Unauthorized to delete this review' });
        }
        await Review.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
};