const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.get('/', ordersController.listOrders);
router.get('/:id', ordersController.getOrder);
router.post('/', ordersController.createOrder);
router.patch('/:id', ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
