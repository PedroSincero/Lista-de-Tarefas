const rescue = require('express-rescue');
const Joi = require('joi');

const validUser = rescue(async(req, _res, next) => {
  const { error } = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).validate(req.body);
  if(error) {
    console.log('entrei aqui');
    return next(error);
  }
  return next();
});

module.exports = {
  validUser
};