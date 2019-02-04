const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
  Balance: require('../models/balance'),
  User: require('../models/user'),
  OrderRequest: require('../models/order-requests')
};
