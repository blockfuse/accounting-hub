export class Ticker {
  pair = '';
  ask = '';
  bid = '';
  last = '';
  volume;

  type = '';

  constructor(data) {
    Object.assign(this, data);
  }
}
