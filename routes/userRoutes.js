const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);

module.exports = routes;