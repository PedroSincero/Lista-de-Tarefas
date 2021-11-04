const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

// router.get('/', taskController.findAll);

// router.get('/:id', taskController.findOne);

router.post('/', taskController.add);

// router.put('/:id', taskController.edit);

// router.delete('/:id', taskController.exclude);

module.exports = router;