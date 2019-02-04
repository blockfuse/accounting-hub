import moment from 'moment';

export class DateTimeFormatValueConverter {
  toView(value, format = 'M/D/YYYY') {
    return moment(value).format(format);
  }
}
