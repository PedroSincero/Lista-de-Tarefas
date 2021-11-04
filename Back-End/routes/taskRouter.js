const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();
const { validTask } = require('../middleware/taskValidations');

router.get('/', taskController.findAll);

router.post('/', validTask, taskController.add);

router.put('/', taskController.edit);

// router.delete('/', taskController.exclude);

module.exports = router;