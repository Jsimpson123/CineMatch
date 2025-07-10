require('dotenv').config();
const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;

//Fetches popular movies, returning as json
const fetchPopularMovies = async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular`,
            {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-UK',
                    page: 1
                }
            }
        );

        //Map to return only specific fields
        const simplifiedMovies = response.data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            posterPath: movie.poster_path,
            releaseDate: movie.release_date,
            rating: movie.vote_average
        }));

        res.json(simplifiedMovies);

    } catch (error) {
        console.error('Error fetching movies from TMDb:', error.message);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

const saveLikedMovie = async (req, res) => {
    const { movie } = req.body;

    try {
        const db = require('../firebase');

        //For a test user:
        const testUserId = 'testUser';
        const likedMoviesRef = db.collection('users').doc(testUserId).collection('likedMovies');

        await likedMoviesRef.doc(String(movie.id)).set(movie);

        res.status(200).json({ message: 'Movie saved successfully.' });
    } catch (error) {
        console.error('Error saving liked movie:', error);
        res.status(500).json({ error: 'Failed to save liked movie.' });
    }
};

module.exports = { fetchPopularMovies, saveLikedMovie };
