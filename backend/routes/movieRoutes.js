const express = require('express');
const router = express.Router();
const { fetchPopularMovies } = require('../controllers/movieController');

//GET popular movies
router.get('/popular', fetchPopularMovies);

module.exports = router;
