const express = require('express');
const router = express.Router();
const balancesService = require('@coinmesh/gemini-adapter').balancesService;
const dbBalancesService = require('../services/balances');

router.get('/', (req, res, next) => {
  balancesService.getBalances().then(geminiBalances => {
    dbBalancesService.getAll().then(dbBalances => {
      if (!dbBalances) {
        geminiBalances.forEach(balance => {
          dbBalancesService.create(balance);
        });
      } else {
        dbBalances.forEach(dbBalance => {
          const newBalance = geminiBalances.find(balance => balance.currency === dbBalance.currency);
          dbBalancesService.update(dbBalance.id, newBalance);
        });
      }
      return res.json(geminiBalances);
    });
  });
});

module.exports = router;
