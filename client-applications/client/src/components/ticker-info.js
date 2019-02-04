import {bindable, containerless} from 'aurelia-templating';

@containerless
export class TickerInfo {
  @bindable ticker;
  @bindable currency = '';
}
