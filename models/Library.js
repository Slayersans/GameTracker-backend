const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    timeplayed: { type: Number, min: 0 }, // in hours
    favorite: { type: Boolean, default: false },
    state: { type: String, enum: ['Playing', 'Completed', 'Plan to Play'], default: 'Plan to Play' },
    addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Library', librarySchema);