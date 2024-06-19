import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
      fetch("https://sci-flix-075b51101639.herokuapp.com/movies/")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.Title,
            director: doc.Director.Name,
            genre: doc.Genre.name
          };
        });
        setMovies(moviesFromApi);
      });
    }, [])

    if(selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if(movies.length === 0) {
        return <div>The list is empty</div>
    };

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                key={movie.Title}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    );
};
