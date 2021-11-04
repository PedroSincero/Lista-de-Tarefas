const taskModel = require('../models/taskModel');

const { ObjectId } = require('mongodb');

const validID = async  (id) => {
  if (!ObjectId.isValid(id)) return false;

  const findOne = await taskModel.findOne(id);
  if (!findOne) return false;
  return true;
};

module.exports = {
  validID
}