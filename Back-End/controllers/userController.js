const userModel = require('../models/userModel');

const { emailUnique } = require('../services/userValid');

const add = async (req, res) => {
  const { name, email, password } = req.body;
  const isvalidEmail = await emailUnique(email);
  
  if(isvalidEmail) return res.status(409).json({ message: 'Email already registered'});
  
  const userID = await userModel.add(name, email, password);
  return res.status(201).json({ sucess: userID });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const findID = await userModel.findUser(email, password);

    if (!findID) return res.status(404).json({ message: 'Login Invalid, try again'});

    return res.status(200).json({ sucess: findID });
}

module.exports = {
  add,
  login,
}