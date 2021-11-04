const rescue = require('express-rescue');
const Joi = require('joi');

const validTask = rescue(async(req, _res, next) => {
  const { error } = Joi.object({
  task: Joi.string().required(),
  status: Joi.string().required(),
}).validate(req.body);
  if(error) {
    return next(error);
  }
  return next();
});

const validEdit = rescue(async(req, _res, next) => {
  const { task } = req.body;
  const { error } = Joi.string().required().validate(task);

  if(error) {
    return next(error);
  }
  return next();
});

module.exports = {
  validTask,
  validEdit,
};