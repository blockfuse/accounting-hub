const addressesService = new (require('./services/addresses'));
const balancesService = new (require('./services/balances'));
const ordersService = new (require('./services/orders'));
const publicApisService = new (require('./services/public-apis'));
const tradesService = new (require('./services/trades'));
const transfersService = new (require('./services/transfers'));

module.exports = {
  addressesService,
  balancesService,
  ordersService,
  publicApisService,
  tradesService,
  transfersService
};
