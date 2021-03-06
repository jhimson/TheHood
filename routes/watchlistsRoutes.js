const express = require('express');
const router = express.Router();

const {
  getAllWatchlists,
  deleteWatchlist,
  newWatchlist,
  createWatchList,
  updateWatchList,
  editWatchlist,
  addStockToWatchlist,
  removeStock,
  searchWatchlist
} = require('../controllers/watchlistsController');

//! Authorization Middleware
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
});

router.get('/', getAllWatchlists);
router.get('/new', newWatchlist);
router.get('/edit/:id', editWatchlist);
router.get('/:id/:name', addStockToWatchlist);
router.get('/remove/:watchlist_id/:stock_id', removeStock);
router.post('/', createWatchList);
router.post('/search', searchWatchlist);
router.put('/edit/:id', updateWatchList);
router.delete('/:id', deleteWatchlist);

module.exports = router;
