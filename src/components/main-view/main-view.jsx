import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);

    useEffect(() => {
        if (!token) return;

        fetch("https://sci-flix-075b51101639.herokuapp.com/movies/",  {
            headers: { Authorization: `Bearer ${token}` }
          })
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
    }, [token]);
    
    if (!user) {
        return (
            <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
        );
    }

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
            <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
          {movies.map((movie) => (
            <div key={movie._id} onClick={(newSelectedMovie) => {setSelectedMovie(movie)} }>{movie.title}</div>
          ))}
        </div>
      );
    };
