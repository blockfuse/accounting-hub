const express = require('express');
const router = express.Router();
const publicApisService = require('@coinmesh/gemini-adapter').publicApisService;

router.get('/:pair', (req, res, next) => {
  const pair = req.params.pair;

  publicApisService.getTicker(pair).then(result => {
    const acceptableRate = (parseFloat(result.bid) * .98);

    const acceptableRateString = acceptableRate.toString();
    const dotIndex = acceptableRateString.indexOf('.');

    const twoDecimalAcceptableRate = dotIndex > -1 ? acceptableRateString.slice(0, dotIndex + 3) : acceptableRateString;
    return res.json(twoDecimalAcceptableRate);
  }).catch(error => {
    res.status(error.status || 500).json({ error });
  });
});

module.exports = router;
