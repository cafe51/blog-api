const express = require('express');
const LoginController = require('../controller/LoginController');

const router = express.Router();

const controller = new LoginController();

router.post('/', controller.login);

module.exports = router;
