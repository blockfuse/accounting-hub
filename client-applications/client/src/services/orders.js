import {HttpWrapper} from './http-wrapper';
import {Order} from 'models/order';

export class OrdersService {
  static inject = [HttpWrapper];
  constructor(http) {
    this.http = http;
  }

  placeOrder(order) {
    if (order.side === 'buy') {
      return this.http.post('/buy', order);
    }
    return this.http.post('/sell', order);
  }
  getOrders() {
    return this.http.get(`/order-requests`).then(orders => {
      return orders.map(order => new Order(order));
    });
  }
  getOpenOrders() {
    return this.http.get(`/order-requests/open`).then(orders => {
      return orders.map(order => new Order(order));
    });
  }
  cancelAllOrders() {
    return this.http.delete(`/order-requests/cancel-all`);
  }
}
