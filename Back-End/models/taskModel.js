const {ObjectId} = require('mongodb');
const connection = require('./connections');

const add = async (task) => {
  const db = await connection();
  const addTask = await db.collection('tasks').insertOne({task});
  const result = addTask.insertedId;
  return result;
}

const findAll = async () => {
  const db = await connection();
  const getAll = await db.collection('tasks').find().toArray();
  return getAll;
}

const findOne = async (id) => {
  const db = await connection();
  const getID = await db.collection('tasks').findOne(ObjectId(id));
  return getID;
}

const edit = async (id, task) => {
  const db = await connection();
  const update = await db.collection('tasks').findOneAndUpdate({ _id: ObjectId(id)},
  {
    $set: { task }
  },
  {
    returnDocument: 'after'
  });

  return update.value;
}

const exclude = async (id) => {
  const db = await connection();
  const result = await db.collection('tasks').deleteOne({ _id: ObjectId(id) });
  return result;
}

module.exports = {
  add,
  findAll,
  findOne,
  edit,
  exclude,
}