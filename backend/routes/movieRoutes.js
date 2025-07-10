const express = require('express');
const router = express.Router();
const { fetchPopularMovies, saveLikedMovie} = require('../controllers/movieController');

//GET popular movies
router.get('/popular', fetchPopularMovies);

router.post('/like', saveLikedMovie)

module.exports = router;
