import {HttpWrapper} from './http-wrapper';
import {Trade} from 'models/trade';

export class TradesService {
  static inject = [HttpWrapper];
  constructor(http) {
    this.http = http;
  }

  getTrades(pair) {
    return this.http.get(`/trades/${pair}`).then(trades => {
      return trades.map(trade => new Trade(trade));
    });
  }
}
