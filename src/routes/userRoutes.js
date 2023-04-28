const express = require('express');
const UserController = require('../controller/UserController');
const UserService = require('../services/UserService');
const { authenticator } = require('../middleware/authenticator');

const router = express.Router();

const controller = new UserController(new UserService());

router
  .post('/', controller.registerUser)
  .use(authenticator)
  .get('/', controller.getAllUsers)
  .get('/:id', controller.getUserById)
  .delete('/me', controller.deleteUserByMe);

module.exports = router;
