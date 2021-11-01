const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.router();

router.post('/', loginController.login);

module.exports = router;