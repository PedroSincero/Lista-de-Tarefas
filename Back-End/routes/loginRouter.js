const express = require('express');
const loginController = require('../controllers/loginController');
const { validLogin } = require('../middleware/loginValidations');

const router = express.Router();

router.post('/',validLogin, loginController.login);

module.exports = router;