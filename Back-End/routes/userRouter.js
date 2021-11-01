const express = require('express');
const userController = require('../controllers/userController');

const router = express.router();

router.post('/', userController.add);

module.exports = router;