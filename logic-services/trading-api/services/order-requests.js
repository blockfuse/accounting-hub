const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const OrderRequest = db.OrderRequest;

module.exports = {
  getAll,
  getById,
  create,
  update
};

async function getAll() {
  return await OrderRequest.find().select('-hash');
}

async function getById(id) {
  return await OrderRequest.findById(id).select('-hash');
}

async function create(orderParam) {
  if (await OrderRequest.findOne({ client_order_id: orderParam.client_order_id })) {
    throw 'OrderRequest client_order_id "' + orderParam.client_order_id + '" is already taken';
  }

  const order = new OrderRequest(orderParam);

  await order.save();
  return order;
}

async function update(id, orderParam) {
  const order = await OrderRequest.findById(id);

  if (!order) throw 'OrderRequest not found';

  Object.assign(order, orderParam);

  await order.save();
}

