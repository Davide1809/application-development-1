const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const validateApiKey = require('../middleware/validateApiKey');

router.get('/', tasksController.listTasks);
router.get('/:id', tasksController.getTask);
router.post('/', validateApiKey, tasksController.createTask);
router.patch('/:id', validateApiKey, tasksController.updateTask);
router.delete('/:id', validateApiKey, tasksController.deleteTask);

module.exports = router;
