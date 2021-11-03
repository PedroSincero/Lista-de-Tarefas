const connection = require('./connections');

const add = async (name, email, password) => {
  const db = await connection();
  const addUser = await db.collection('users').insertOne({ name, email, password });
  console.log('oi bobo',addUser);
  const result = addUser.insertedId;
  return result;
};

const findByEmail = async (email) => {
  const db = await connection();
  const findEmail = await db.collection('users').findOne({ email });
  return findEmail;
}

module.exports = {
  add,
  findByEmail
}