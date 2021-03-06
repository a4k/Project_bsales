var createError = require('http-errors');
var express = require('express');
var http = require("http");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const productRouter = require('./routes/product');
const buyRouter = require('./routes/buy');
const servicesRouter = require('./routes/services');
const serviceRouter = require('./routes/service');
const cserviceRouter = require('./routes/cservice');
const supportRouter = require('./routes/support');
const aboutRouter = require('./routes/about');
const eventsRouter = require('./routes/events');
const eventRouter = require('./routes/event');
const hireRouter = require('./routes/hire');
const contactsRouter = require('./routes/contacts');
const priceRouter = require('./routes/price');
const uprcompanyRouter = require('./routes/uprcompany');
const historyRouter = require('./routes/history');
const fanalysRouter = require('./routes/fanalys');

var app = express();
var port = 3050;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/product', productRouter);
app.use('/buy', buyRouter);
app.use('/services', servicesRouter);
app.use('/service', serviceRouter);
app.use('/cservice', cserviceRouter);
app.use('/support', supportRouter);
app.use('/about', aboutRouter);
app.use('/events', eventsRouter);
app.use('/event', eventRouter);
app.use('/hire', hireRouter);
app.use('/contacts', contactsRouter);
app.use('/price', priceRouter);
app.use('/uprcompany', uprcompanyRouter);
app.use('/history', historyRouter);
app.use('/fanalys', fanalysRouter);

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
  res.render('error');
});
var server = http.createServer(app).listen(port, () => {
  console.log('Listen server on port :: ' + port)
});

module.exports = app;
