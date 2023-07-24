const express = require('express');
const passport = require('passport');
const habitCotroller = require('../controllers/habbit_controller');

const router = express.Router();

router.post('/create',passport.checkAuthentication, habitCotroller.createHabit);
router.get('/remove',habitCotroller.destroyHabit);
router.get('/favorite-habit',habitCotroller.favouriteHabit);
router.get('/status-update',habitCotroller.habitStatusUpdate);

module.exports = router;