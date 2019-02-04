const express = require('express');
const router = express.Router();
const tradesService = require('@coinmesh/gemini-adapter').tradesService;

router.get('/:pair', (req, res, next) => {
  const currencyPair = req.params.pair;

  tradesService.getTrades(currencyPair).then(result => {
    return res.json(result);
  });
});

module.exports = router;
