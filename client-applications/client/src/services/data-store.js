export class DataStore {
  balances = [];
  ticker = [];

  getBalanceByCurrencySymbol(currencySymbol) {
    return this.balances.find(balance => {
      return balance.currency.toLowerCase() === currencySymbol.toLowerCase();
    });
  }
  getTickerByPair(currencyPair) {
    return this.tickers.find(ticker => {
      return ticker.pair.toLowerCase() === currencyPair.toLowerCase();
    });
  }
}
