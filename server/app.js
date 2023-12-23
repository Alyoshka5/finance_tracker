const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const transactionRouter = require('./routes/transactions');
const authRouter = require('./routes/auth');
const verifyJWT = require('./middleware/verifyJWT');

const app = express();

// database setup
mongoose.set('strictQuery', false);
const mongoDbUrl = process.env.MONGO_URL;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDbUrl);
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors());

app.use('/auth', authRouter);
app.use(verifyJWT);
app.use('/transactions', transactionRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

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

module.exports = app;
