const userModel = require('../models/userModel');
const {} = require('../services/userValid');

const add = async (req, res) => {
  const { name, email, password } = req.body;

  const [user] = await userModel.add(name, email, password);
  return res.status(201).json({ user });
}

module.exports = {
  add,
}