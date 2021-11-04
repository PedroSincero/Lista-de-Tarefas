const connection = require('./connections');

const add = async (name, email, password) => {
  const db = await connection();
  const addUser = await db.collection('users').insertOne({ name, email, password });
  const result = addUser.insertedId;
  return result;
};

const findByEmail = async (email) => {
  const db = await connection();
  const findEmail = await db.collection('users').findOne({ email });
  return findEmail;
}

const findUser = async (email, password) => {
  const db = await connection();
  const findOne = await db.collection('users').findOne({ email, password }, {projection: {password: false, email: false}});
  
  return findOne;
}

module.exports = {
  add,
  findByEmail,
  findUser
}

// Agradecimentos a Lucas Martins - Pelo auxilio na logica da linha 25