const express = require('express');
const router = express.Router();
const ordersService = require('@coinmesh/gemini-adapter').ordersService;
const orderRequestsService = require('../services/order-requests');

class SellOrder {
  constructor(data) {
    this.client_order_id = new Date().getTime().toString();
    this.invoiceRequestData = data.client_order_id;
    this.createdById = data.createdById;
    this.symbol = data.symbol;
    this.amount = data.amount;
    this.price = data.price;
    this.side = 'sell';
    this.type = 'exchange limit';
    this.status = 'created';
    this.options = data.options;
  }
}

router.post('/', (req, res, next) => {
  let newValues = req.body;
  const sellOrder = new SellOrder(newValues);

  orderRequestsService.create(sellOrder).then(newOrderRequest => {

    ordersService.newOrder(sellOrder).then(result => {
      return res.json(result);
    }).catch(error => {
      res.status(error.status || 500).json({ error });
    });
  }).catch(error => {
      res.status(error.status || 500).json({ error });
    });
});

module.exports = router;
