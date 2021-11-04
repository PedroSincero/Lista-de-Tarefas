const taskModel = require('../models/taskModel');

const { validEdit } = require('../services/taskValid');

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

const edit = async (req, res) => {
  const { id, task } = req.body;
  const isValidEdit = await validEdit(id);

  if(!isValidEdit) return res.status(400).json({message: 'Invalid ID, try again.'})
  const result = await taskModel.edit(id, task);
  return res.status(201).json({ sucess: result});
}

// const exclude = async (req, res) => {

// }

module.exports = {
  add,
  findAll,
  edit,
  // exclude,
}