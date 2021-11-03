// const Joi = require('joi');
const { login } = require('../models/loginModel');

const isUserExist = async (email, password) => {
  const result = await login(email, password);
  
  if(!result) {
    return false;
  }
  return result;
}


module.exports = {
  isUserExist
}