const taskModel = require('../models/taskModel');

const { validID } = require('../services/taskValid');

const add = async (req, res) => {
  const { task, status } = req.body;

  const findTask = await taskModel.add(task, status);
  return res.status(201).json({ sucess: findTask });
}

const findAll = async (req, res) => {
  const result = await taskModel.findAll();
  return res.status(200).json({ sucess: result})
}

const edit = async (req, res) => {
  const { id, task, status } = req.body;
  const isValidEdit = await validID(id);
  
  if(!isValidEdit) return res.status(400).json({message: 'Invalid ID, try again.'})
  const result = await taskModel.edit(id, task, status);
  return res.status(201).json({ sucess: result});
}

const exclude = async (req, res) => {
  const { id } = req.body;
  const isValidExclude = await validID(id);
  if(!isValidExclude) return res.status(400).json({message: 'Invalid ID, try again.'});
  
  await taskModel.exclude(id);
  return res.status(204).json();
}

module.exports = {
  add,
  findAll,
  edit,
  exclude,
}