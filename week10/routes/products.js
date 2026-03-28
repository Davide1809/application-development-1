const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const validateProduct = require('../middleware/validateProduct');
const validateApiKey = require('../middleware/validateApiKey');

router.get('/', productsController.listProducts);
router.get('/:id', productsController.getProduct);
router.post('/', validateApiKey, validateProduct, productsController.createProduct);
router.patch('/:id', validateApiKey, productsController.updateProduct);
router.delete('/:id', validateApiKey, productsController.deleteProduct);

module.exports = router;
