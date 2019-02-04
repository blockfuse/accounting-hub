import {DataStore} from 'services/data-store';
import {OrdersService} from 'services/orders';
import {Order} from 'models/order';

export class BalanceList {
  dataStore;
  orders = [];
  activeTab = '';

  static inject = [DataStore, OrdersService];
  constructor(dataStore, ordersService) {
    this.dataStore = dataStore;
  }

  getTicker(pair) {
    return this.ordersService.getTicker(pair);
  }
  buy(pair) {
    return this.getTicker(pair).then(result => {
      const order = new Order({
        symbol: pair,
        price: result.bid,
        amount: '1.0',
        side: 'buy',
        options: ['immediate-or-cancel']
      });

      return this.ordersService.placeOrder(order).then(result => {
        this.orders.push(result);
      });
    });
  }
  sell() {
    return this.getTicker(pair).then(result => {
      const order = new Order({
        symbol: pair,
        price: result.ask,
        amount: '1.0',
        side: 'sell',
        options: ['immediate-or-cancel']
      });

      return this.ordersService.placeOrder(order).then(result => {
        this.orders.push(result);
      });
    });
  }
}
