const express = require('express');
const router = express.Router();
const passport = require('passport');
let friendsController = require('../controllers/friendsController');

router.get('/suggestions/:id', passport.checkAuthentication, friendsController.sendRequest);
router.get('/accept/:id', passport.checkAuthentication, friendsController.acceptRequest);
router.get('/cancel/:id', passport.checkAuthentication, friendsController.cancelRequest);
router.get('/remove/:id', passport.checkAuthentication, friendsController.removeFriend);




module.exports = router;