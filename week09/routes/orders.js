const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const validateApiKey = require('../middleware/validateApiKey');
const validateOrder = require('../middleware/validateOrder');

router.get('/', ordersController.listOrders);
router.get('/:id', ordersController.getOrder);
router.post('/', validateApiKey, validateOrder, ordersController.createOrder);
router.patch('/:id', validateApiKey, ordersController.updateOrder);
router.delete('/:id', validateApiKey, ordersController.deleteOrder);

module.exports = router;
