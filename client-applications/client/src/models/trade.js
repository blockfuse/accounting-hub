export class Trade {
  aggressor = false;
  amount = '';
  client_order_id = '';
  exchange = '';
  fee_amount = '';
  fee_currency = '';
  is_auction_fill = false;
  order_id = '';
  price = '';
  tid = '';
  timestamp = '';
  timestampms = '';

  type = '';

  constructor(data) {
    Object.assign(this, data);
  }
}
