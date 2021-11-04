// const {ObjectId} = require('mongodb');
const connection = require('./connections');

const add = async (task) => {
  const db = await connection();
  const addTask = await db.collection('tasks').insertOne({task});
  const result = addTask.insertedId;
  return result;
}

const findAll = async () => {

}

const findOne = async () => {

}

const edit = async () => {

}

const exclude = async () => {

}

module.exports = {
  add,
  findAll,
  findOne,
  edit,
  exclude,
}