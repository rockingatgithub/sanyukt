const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
router.get('/profile', usersController.profile);
router.get('/signin', usersController.signin);
router.get('/signup', usersController.signup);

router.post('/create', usersController.create);

module.exports = router;