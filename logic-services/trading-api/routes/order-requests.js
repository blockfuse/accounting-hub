const express = require('express');
const router = express.Router();
const orderRequestsService = require('../services/order-requests');
const ordersService = require('@coinmesh/gemini-adapter').ordersService;

router.get('/', (req, res, next) => {
  orderRequestsService.getAll().then(result => {
    return res.json(result);
  });
});

router.get('/open', (req, res, next) => {
  ordersService.getOrders().then(result => {
    return res.json(result);
  });
});

router.delete('/cancel-all', (req, res, next) => {
  orderRequestsService.getAll().then(allOrders => {
    ordersService.cancelAllOrders().then(result => {
      const promises = [];
      allOrders.forEach(order => {
        order.status = 'cancelled';
        const updatePromise = orderRequestsService.update(order.id, order);

        promises.push(updatePromise);
      });
      Promise.all(promises).then(result => {
        return res.json(true);
      });
    });
  });
});

module.exports = router;
