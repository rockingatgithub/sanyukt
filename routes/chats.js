const express = require('express');
const router = express.Router();

const chatsController = require('../controllers/chats_controller');

router.post('/create', chatsController.create);

module.exports = router ;