const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  amount: { type: String },
  available: { type: String },
  availableForWithdrawal: { type: String },
  currency: { type: String },
  createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Balance', schema);
