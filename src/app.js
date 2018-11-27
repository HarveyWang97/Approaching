const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const database = require('./database/Database');
const timeInterval = 3600000; // one hour in miliseconds
const notificationOn = false; // set notification on to enable email service

const indexRouter = require('./routers/IndexRouter');
const usersRouter = require('./routers/UsersRouter');
const itemsRouter = require('./routers/ItemsRouter');
const eventsRouter = require('./routers/EventsRouter');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.set('json spaces', 2);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/events', eventsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error: Something wrong');
});

// run checkExpiration in a loop
if (notificationOn) {
  database.checkExpiration(0);
  setInterval(function(){database.checkExpiration(timeInterval)}, timeInterval); 
}

module.exports = app;
