const userModel = require('../models/userModel');
// const {} = require('../services/userValid');

const add = async (req, res) => {
  const { name, email, password } = req.body;
  
  const userID = await userModel.add(name, email, password);
  return res.status(201).json({ userID });
}

module.exports = {
  add,
}