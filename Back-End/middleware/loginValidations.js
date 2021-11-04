const rescue = require('express-rescue');
const Joi = require('joi');


const validLogin = rescue(async(req, _res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(req.body);
  if(error) {
    return next(error);
  }
  return next();
});


module.exports = {
  validLogin
};