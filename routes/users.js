const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/signup', usersController.signup);

router.get('/signin', usersController.signin);

router.post('/create', usersController.create);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},

), usersController.createSession);

router.get('/signout', usersController.destroySession);

module.exports = router;