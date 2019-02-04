import {HttpWrapper} from './http-wrapper';
import {Ticker} from 'models/ticker';

export class TickersService {
  static inject = [HttpWrapper];
  constructor(http) {
    this.http = http;
  }

  getTicker(pair) {
    return this.http.get(`/ticker/${pair}`).then(ticker => {
      ticker.pair = pair;
      return new Ticker(ticker);
    });
  }
}
