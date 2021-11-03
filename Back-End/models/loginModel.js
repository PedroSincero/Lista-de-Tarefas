const connection = require('./connections');

const login = async (email, password) => {
  const db = await connection();
  const findUser = await db.collection('users')
    .findOne({ email,  password});
  return findUser
};

module.exports = { login }