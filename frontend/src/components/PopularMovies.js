import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PopularMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/movies/popular');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, []);

    //Correctly triggered only on click
    const handleLike = async (movie) => {
        try {
            await axios.post('http://localhost:5000/api/movies/like', { movie });
            console.log(`${movie.title} liked and saved!`);
        } catch (error) {
            console.error('Error saving liked movie:', error);
        }
    };

    return (
        <div>
            <h2>Popular Movies</h2>
            {movies.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id}>
                            <h3>{movie.title}</h3>
                            <p>{movie.description}</p>
                            {movie.posterPath && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                                    alt={movie.title}
                                    onClick={() => handleLike(movie)}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                            <p>Release Date: {movie.releaseDate}</p>
                            <p>Rating: {movie.rating}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PopularMovies;
