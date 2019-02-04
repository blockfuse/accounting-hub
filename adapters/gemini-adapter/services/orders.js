const httpService = new (require('./http-service'));

class OrdersService {
  getOrders() {
    return httpService.post('/v1/orders', {}).then(result => {
      return result.data;
    });
  }
  newOrder(data) {
    const orderDataDefaults = {
      client_order_id: new Date().getTime().toString(),
      type: 'exchange limit'
    };

    const orderData = Object.assign(orderDataDefaults, data);
    return httpService.post('/v1/order/new', orderData).then(result => {
      return result.data;
    });
  }
  cancelOrder(orderId) {
    return httpService.post('/v1/order/cancel', {order_id: orderId}).then(result => {
      return result.data;
    });
  }
  cancelAllOrders() {
    return httpService.post('/v1/order/cancel/all', {}).then(result => {
      return result.data;
    });
  }
}

module.exports = OrdersService;
