const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true},
    comment: { type: String },
    timeplayed: { type: Number, min: 0 }, // in hours
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
    recommended: { type: Boolean, default: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);