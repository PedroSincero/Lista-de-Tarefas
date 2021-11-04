const express = require('express');
const userController = require('../controllers/userController');
const { validUser } = require('../middleware/userValidations');
const router = express.Router();

router.post('/', validUser, userController.add);

module.exports = router;