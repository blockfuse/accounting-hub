const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const jwt = require('./config/jwt');
const errorHandler = require('./config/error-handler');

const balances = require('./routes/balances');
const buy = require('./routes/buy');
const exchangeRates = require('./routes/exchange-rates');
const orderRequests = require('./routes/order-requests');
const sell = require('./routes/sell');
const trades = require('./routes/trades');
const ticker = require('./routes/ticker');
const users = require('./routes/users');

const app = express();

mongoose.connect('mongodb://mongodb:27017/trading');

app.use(logger('dev'));
app.use(cors());
app.use(jwt());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/v1/balances', balances);
app.use('/v1/buy', buy);
app.use('/v1/order-requests', orderRequests);
app.use('/v1/exchange-rates', exchangeRates);
app.use('/v1/sell', sell);
app.use('/v1/trades', trades);
app.use('/v1/ticker', ticker);
app.use('/v1/users', users);

app.use(errorHandler);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
