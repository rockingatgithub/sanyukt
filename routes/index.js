const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);
router.use('/users', require('./users'));  // as this file is used as main file 




console.log('route is working');

module.exports = router ;