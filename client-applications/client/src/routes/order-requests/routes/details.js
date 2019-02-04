import {DataStore} from 'services/data-store';

export class Details {
  orderRequest;

  static inject = [DataStore];
  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  activate(params) {
    const id = params.order__request_id;
    this.orderRequest = this.dataStore.getOrderRequestById(id);
  }
}
