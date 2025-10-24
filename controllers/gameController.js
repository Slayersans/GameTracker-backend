const Game = require('../models/Game');

// Get all games
exports.getAllGames = async (req, res) => {
    try {

        const games = await Game.find();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: 'Error getting games', error: error.message });
    }
};

//get game by id
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: 'Error getting game', error: error.message });
    }
};

// Add a new game
exports.addGame = async (req, res) => {
    try {
        const existingGame = await Game.findOne({ title: req.body.title });
        if (existingGame) {
            return res.status(400).json({ message: 'Game with this title already exists' });
        }
        const data = req.body;
        data.userId = req.user.userId;
        const newGame = new Game(data);
        await newGame.save();
        res.status(201).json({ message: 'Game added successfully', game: newGame });
    } catch (error) {
        res.status(500).json({ message: 'Error adding game', error: error.message });
    }
};

// Update a game
exports.updateGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found' });

        if (game.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized to update this game' });
        }

        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Game updated successfully', game: updatedGame });
    } catch (error) {
        res.status(500).json({ message: 'Error updating game', error: error.message });
    }
};

// Delete a game
exports.deleteGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found' });
        if (game.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this game' });
        }

        await Game.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Game deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting game', error: error.message });
    }
};