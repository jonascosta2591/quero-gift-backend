const express = require('express');
const userController = require('./controllers/userController');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {checkToken} = require('./middlewares/middleware');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/private', checkToken, userController.private);


module.exports = router;