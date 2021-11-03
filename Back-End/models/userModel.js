const connection = require('./connections');

const serialize = ({_id, name, email, password}) => {
  return {
    _id,
    name,
    email,
    password,
  }
}

const add = async (name, email, password) => {
  const db = connection();
  const addUser = await db.collection('users')
  .insertOne({ name, email, password });
  const result = addUser.ops;
  return result.map(serialize);
};

const find = async () => {

}

module.exports = {
  add,
  find
}