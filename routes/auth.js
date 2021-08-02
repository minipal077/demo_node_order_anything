const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const {auth} =require('../middlewares/auth');

// adding new user (sign-up route)
router.post('/register', authController.register);

// sign-in user
router.post('/login', authController.login);

//logout user
router.get('/logout', auth, authController.logout);

module.exports = router;