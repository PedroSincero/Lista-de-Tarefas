const userModel = require('../models/userModel');

const login = async (req, res) => {
  const { email, password } = req.body;
  const findID = await userModel.findUser(email, password);

  if (!findID) return res.status(404).json({ message: 'Login Invalid, try again'});

  return res.status(200).json({ sucess: findID });
}

module.exports = {
  login,
}