import {Router} from 'aurelia-router';
import {DataStore} from 'services/data-store';
import {OrderRequestsService} from 'services/order-requests';

export class Index {
  router;

  static inject = [OrderRequestsService, DataStore];
  constructor(orderRequestsService, dataStore) {
    this.orderRequestsService = orderRequestsService;
    this.dataStore = dataStore;
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], name: 'list', moduleId: './routes/list', title: 'Order Requests List' },
      { route: '/:order_request_id', name: 'details', moduleId: './routes/details', title: 'Order Request Details' },
    ]);

    this.router = router;

    return this.orderRequestsService.getOrderRequests().then(orderRequests => {
      this.dataStore.orderRequests = orderRequests;
    });
  }
}
