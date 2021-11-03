const { findByEmail } = require('../models/userModel');

const emailUnique = async (email) => {
  const result = await findByEmail(email);
  if(!result) {
    return false;
  }
  return true;
}

module.exports = {
  emailUnique
};