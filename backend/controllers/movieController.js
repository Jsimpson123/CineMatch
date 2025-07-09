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

module.exports = { fetchPopularMovies };
