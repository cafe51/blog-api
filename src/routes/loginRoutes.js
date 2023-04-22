const express = require('express');
const UserService = require('../services/UserService');
const LoginController = require('../controller/LoginController');

const router = express.Router();

const controller = new LoginController(new UserService());

router.post('/', controller.login);

module.exports = router;
