const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const createError = require('http-errors');
const logger = require('morgan');
const favicon = require('static-favicon');


const app = express();

// Passport Config
require('./config/passport')(passport);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Associatetion
const thai_provinces = require("./models/thai_provinces");
const thai_geographies = require("./models/thai_geographies");

thai_provinces.hasMany(thai_geographies);


// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Favicon
app.use(favicon());
app.use(logger('dev'));

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/login', require('./api/login_api'));
app.use('/register', require('./api/register_api'));
app.use('/api_data', require('./api/API_Data'));
app.use('/map', require('./api/map'));
app.use('/joint', require('./api/joint'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 8888;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
