const taskModel = require('../models/taskModel');

// const {} = require('../services/taskValid');

const add = async (req, res) => {
  const { task } = req.body;
  console.log(task);

  const findTask = await taskModel.add(task);
  return res.status(201).json({ sucess: findTask });
}

// const findAll = async (req, res) => {

// }

// const findOne = async (req, res) => {

// }

// const edit = async (req, res) => {

// }

// const exclude = async (req, res) => {

// }

module.exports = {
  add,
  // findAll,
  // findOne,
  // edit,
  // exclude,
}