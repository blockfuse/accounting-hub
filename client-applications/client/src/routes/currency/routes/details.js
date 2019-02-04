import {DataStore} from 'services/data-store';
import {TickersService} from 'services/tickers';
import {TradesService} from 'services/trades';

export class Details {
  balance;
  ticker;

  dataStore;
  tradesService;

  static inject = [DataStore, TickersService, TradesService];
  constructor(dataStore, tickersService, tradesService) {
    this.dataStore = dataStore;
    this.tickersService = tickersService;
    this.tradesService = tradesService;
  }

  activate(params) {
    const currencyName = params.currency;
    let promises = [];

    this.balance = this.dataStore.getBalanceByCurrencySymbol(currencyName);

    if (currencyName !== 'usd') {
      let tradesPromise = this.tradesService.getTrades(`${currencyName}usd`).then(trades => {
        this.trades = trades;
      });
      promises.push(tradesPromise);

      let tickerPromise = this.tickersService.getTicker(`${currencyName}usd`).then(ticker => {
        this.ticker = ticker;
      });
      promises.push(tickerPromise);
    }

    return Promise.all(promises);
  }
}
