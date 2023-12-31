const express = require('express');
const passport = require('passport');

const router = express.Router();

// importing user controller module
const userController = require('../controllers/users_controller');

router.get('/sign-up',userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create',userController.create);

// Use passport as a middleware to authenticate
router.post('/create-session', 
    passport.authenticate('local',{failureRedirect : '/users/sign-in'}),userController.createSession);

    router.get('/sign-out',userController.destroySession);


    router.use('/habit',require('./habit'));

module.exports = router;