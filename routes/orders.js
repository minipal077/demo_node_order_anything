const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');
const { adminAuth, delivery_personAuth, customerAuth} =require('../middlewares/auth');

router.post('/createOrder',customerAuth, ordersController.createOrder);
router.get('/',adminAuth, ordersController.ordersList);
router.put('/assignDeliveryPerson/:id',adminAuth, ordersController.assignDeliveryPerson);
router.put('/updateOrderStatus/:id',delivery_personAuth, ordersController.updateOrderStatus);

module.exports = router;