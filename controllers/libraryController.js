const Library = require('../models/Library');
const Game = require('../models/Game');

// Get my library
exports.getMyLibrary = async (req, res) => {
    try {
        const userId = req.user.userId;
        const library = await Library.find({ userId }).populate('games');
        res.status(200).json(library);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Add game to library
exports.addGameToLibrary = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { gameId } = req.body;
        const game = await Game.findById(gameId);
        if (!game) return res.status(404).json({ message: 'Game not found' });
        const existingGame = await Library.findOne({ userId, gameId });
        if (existingGame) return res.status(400).json({ message: 'Game already in library' });
        const newLibraryEntry = new Library({ userId, gameId });
        await newLibraryEntry.save();
        res.status(201).json(newLibraryEntry);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update progress of a game in library
exports.updateGameProgress = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { gameId, timeplayed, favorite, state } = req.body;
        const libraryEntry = await Library.findOne({ userId, gameId });
        if (!libraryEntry) return res.status(404).json({ message: 'Game not found in library' });
        if (timeplayed !== undefined) libraryEntry.timeplayed = timeplayed;
        if (favorite !== undefined) libraryEntry.favorite = favorite;
        if (state !== undefined) libraryEntry.state = state;
        await libraryEntry.save();
        res.status(200).json(libraryEntry);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Remove game from library
exports.removeGameFromLibrary = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { gameId } = req.params;
        const libraryEntry = await Library.findOneAndDelete({ userId, gameId });
        if (!libraryEntry) return res.status(404).json({ message: 'Game not found in library' });
        res.status(200).json({ message: 'Game removed from library' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};