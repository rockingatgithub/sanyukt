const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);
router.use('/users', require('./users'));  // as this file is used as main file use users file for other routes..
router.use('/posts', require('./posts'));  //posts file used for posting..
router.use('/comments', require('./comments'));


console.log('route is working');

module.exports = router ;