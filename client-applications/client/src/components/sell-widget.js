import {bindable, containerless} from 'aurelia-templating';
import {Order} from 'models/order';
import {OrdersService} from 'services/orders';
import {UsersService} from 'services/users';
import {App} from '../app';

@containerless
export class SellWidget {
  @bindable order;
  @bindable ticker;
  amount = '';
  price = '';
  selectedOrderType;
  orderTypes = ['immediate-or-cancel', 'maker-or-cancel', 'fill-or-kill', 'auction-only'];

  ordersService;
  tickersService;
  usersService;

  static inject = [OrdersService, App, UsersService];
  constructor(ordersService, app, usersService) {
    this.ordersService = ordersService;
    this.usersService = usersService;
    this.app = app;
  }

  attached() {
    this.order = new Order();
  }
  tickerChanged(newTicker) {
    if (newTicker) {
      this.price = newTicker.last;
    }
  }
  submitOrder() {
    const pair = this.ticker.pair;
    const createdBy = this.usersService.getUser();

    const order = new Order({
      symbol: pair,
      price: this.price.toString(),
      amount: this.amount.toString(),
      side: 'sell',
      createdById: createdBy._id,
      client_order_id: ObjectId(),
      options: [this.selectedOrderType]
    });

    return this.ordersService.placeOrder(order).then(result => {
      this.order = new Order();
      return this.app.updateBalances();
    });
  }
}
const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
