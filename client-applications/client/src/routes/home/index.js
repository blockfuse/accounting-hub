import {DataStore} from 'services/data-store';
import {OrdersService} from 'services/orders';
import {Order} from 'models/order';

export class Index {
  dataStore;
  orders = [];
  activeTab = '';

  static inject = [DataStore, OrdersService];
  constructor(dataStore, ordersService) {
    this.dataStore = dataStore;
    this.ordersService = ordersService;
  }

  setActiveTab(tabName) {
    if (this.activeTab === tabName) {
      this.activeTab = '';
    } else {
      this.activeTab = tabName;
    }
  }
  attached() {
    return this.ordersService.getOpenOrders().then(result => {
      this.orders = result;
    });
  }
  cancelAllOrders() {
    return this.ordersService.cancelAllOrders().then(result => {
      if (result) {
        this.orders = [];
      }
    });
  }
}
