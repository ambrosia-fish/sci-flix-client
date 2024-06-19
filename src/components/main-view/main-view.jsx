import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://sci-flix-075b51101639.herokuapp.com/movies/")
            .then((response) => response.json())
            .then((movies) => {
                const moviesFromApi = movies.map((movie) => ({
                    _id: movie._id,
                    title: movie.Title,
                    genre: movie.Genre.Name,
                    director: movie.Director.Name
                }));
                setMovies(moviesFromApi);
            })
            .catch(error => {
                console.error("Error fetching movies:", error);
            });
    }, []);
    

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty</div>;
    }

    return (
        <div>
          {movies.map((movie) => (
            <div key={movie._id} onClick={(newSelectedMovie) => {setSelectedMovie(movie)} }>{movie.title}</div>
          ))}
        </div>
      );
    };
