const express = require('express');
const router = express.Router();
const orderRequestsService = require('../services/order-requests');
const ordersService = require('@coinmesh/gemini-adapter').ordersService;

class BuyOrder {
  constructor(data) {
    this.client_order_id = new Date().getTime().toString();
    this.invoiceRequestData = data.client_order_id;
    this.createdById = data.createdById;
    this.symbol = data.symbol;
    this.amount = data.amount;
    this.price = data.price;
    this.side = 'buy';
    this.type = 'exchange limit';
    this.status = 'created';
    this.options = data.options;
  }
}

router.post('/', (req, res, next) => {
  const newValues = req.body;
  const buyOrder = new BuyOrder(newValues);

  ordersService.newOrder(buyOrder).then(result => {
    orderRequestsService.create(buyOrder).then(newOrderRequest => {
      return res.json(newOrderRequest);
    }).catch(error => {
      res.status(error.status || 500).json({ error });
    });
  }).catch(error => {
    res.status(error.status || 500).json({ error });
  });
});

module.exports = router;
