require('dotenv').config(); // Load ENV Variables
require('./config/database');
const express = require('express'); // import express
const app = express();

const middleware = require('./utils/middleware');

// ! Routers
const transactionsRoute = require('./routes/transactionsRoutes');
const usersRoute = require('./routes/usersRoutes');
const watchlistsRoute = require('./routes/watchlistsRoutes');
const stocksRoute = require('./routes/stocksRoutes');
const dashboardRoute = require('./routes/dashboardRoutes');
const newsRoute = require('./routes/newsRoutes');

app.set('view engine', 'ejs');

//! middlewares
middleware(app);

// ! Index
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
  } else {
    res.render('users/signupPage');
  }
});

app.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
  } else {
    res.render('users/loginPage');
  }
});

app.use('/transactions', transactionsRoute);
app.use('/users', usersRoute);
app.use('/watchlists', watchlistsRoute);
app.use('/stocks', stocksRoute);
app.use('/dashboard', dashboardRoute);
app.use('/news', newsRoute);

const PORT = process.env.PORT;
const port = 3000;
app.listen(PORT || port, () => console.log(`Now Listening on port ${PORT || port}`));
