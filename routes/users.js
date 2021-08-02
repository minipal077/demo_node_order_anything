const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { adminAuth, customerAuth} =require('../middlewares/auth');

router.put('/cart/addToCart/:id', customerAuth, usersController.addToCart);
router.get('/',adminAuth, usersController.deliveryPersonList);
module.exports = router;