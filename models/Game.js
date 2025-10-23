const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    genre: { type: String, required: true },
    platform: { type: String, required: true },
    releaseDate: { type: Number, required: true },
    developer: { type: String, required: true },
    cover : { type: String }, // URL to the cover image
    description: { type: String },
    completted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Game', gameSchema);