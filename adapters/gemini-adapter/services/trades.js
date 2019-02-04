const httpService = new (require('./http-service'));

class TradesService {
  getTrades(pair) {
    return httpService.post('/v1/mytrades', {symbol: pair}).then(result => {
      return result.data;
    });
  }
}

module.exports = TradesService;
