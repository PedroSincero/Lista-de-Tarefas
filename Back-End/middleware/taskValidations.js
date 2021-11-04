const rescue = require('express-rescue');
const Joi = require('joi');

const validTask = rescue(async(req, _res, next) => {
  const { error } = Joi.object({
  task: Joi.string().required(),
}).validate(req.body);
  if(error) {
    return next(error);
  }
  return next();
});

module.exports = {
  validTask,
};