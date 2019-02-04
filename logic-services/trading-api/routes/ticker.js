const express = require('express');
const router = express.Router();
const publicApisService = require('@coinmesh/gemini-adapter').publicApisService;

router.get('/:pair', (req, res, next) => {
  const pair = req.params.pair;

  publicApisService.getTicker(pair).then(result => {
    return res.json(result);
  }).catch(error => {
    res.status(error.status || 500).json({ error });
  });
});

module.exports = router;
