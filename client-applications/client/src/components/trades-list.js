import {bindable, containerless} from 'aurelia-templating';

@containerless
export class TradesList {
  @bindable trades = [];
}
