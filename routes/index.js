const express = require('express');

const router = express.Router();

// check wheter router is loaded or not
console.log('router is loaded');

// controller for routing
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home)

// users router
router.use('/users' , require('./users'));

module.exports = router;