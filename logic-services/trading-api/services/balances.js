const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const Balance = db.Balance;

module.exports = {
  getAll,
  getById,
  create,
  update
};

async function getAll() {
  return await Balance.find().select('-hash');
}

async function getById(id) {
  return await Balance.findById(id).select('-hash');
}

async function create(balanceParam) {
  if (await Balance.findOne({ currency: balanceParam.currency })) {
    throw 'Balance for currency "' + balanceParam.currency + '" is already taken';
  }

  const balance = new Balance(balanceParam);

  await balance.save();
  return balance;
}

async function update(id, balanceParam) {
  const balance = await Balance.findById(id);

  if (!balance) throw 'Balance not found';

  Object.assign(balance, balanceParam);

  await balance.save();
}

