const taskModel = require('../models/taskModel');

// const {} = require('../services/taskValid');

const add = async (req, res) => {
  const { task } = req.body;
  console.log(task);

  const findTask = await taskModel.add(task);
  return res.status(201).json({ sucess: findTask });
}

const findAll = async (req, res) => {
  const result = await taskModel.findAll();
  return res.status(200).json({ sucess: result})
}

// const edit = async (req, res) => {

// }

// const exclude = async (req, res) => {

// }

module.exports = {
  add,
  findAll,
  // edit,
  // exclude,
}