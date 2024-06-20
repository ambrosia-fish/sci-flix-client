import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";

// Define the MainView component
export const MainView = () => {
    // Retrieve stored user and token from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    // useState hook to manage the movies state
    const [movies, setMovies] = useState([]);
    // useState hook to manage the selected movie state
    const [selectedMovie, setSelectedMovie] = useState(null);
    // useState hook to manage the user state
    const [user, setUser] = useState(storedUser ? storedUser : null);
    // useState hook to manage the token state
    const [token, setToken] = useState(storedToken ? storedToken : null);

    // useEffect hook to fetch movies when the token changes
    useEffect(() => {
        if (!token) return; // If no token, do nothing

        fetch("https://sci-flix-075b51101639.herokuapp.com/movies/", {
            headers: { Authorization: `Bearer ${token}` } // Include the token in the request headers
        })
        .then((response) => response.json()) // Parse the response JSON
        .then((movies) => {
            // Map the movies data to the desired format
            const moviesFromApi = movies.map((movie) => ({
                _id: movie._id,
                title: movie.Title,
                genre: movie.Genre.Name,
                director: movie.Director.Name
            }));
            // Update the movies state with the fetched data
            setMovies(moviesFromApi);
        })
        .catch(error => {
            console.error("Error fetching movies:", error); // Handle any errors that occur
        });
    }, [token]); // The effect depends on the token

    // If the user is not logged in, show the login and signup views
    if (!user) {
        return (
            <>
                <LoginView onLoggedIn={(user, token) => {
                    setUser(user); // Set the user state
                    setToken(token); // Set the token state
                }} />
                or
                <SignupView />
            </>
        );
    }

    // If a movie is selected, show the MovieView component
    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    // If the movies list is empty, show a message
    if (movies.length === 0) {
        return <div>The list is empty</div>;
    }

    // Render the list of movies and a logout button
    return (
        <div>
            <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
            {movies.map((movie) => (
                <div key={movie._id} onClick={() => { setSelectedMovie(movie); }}>{movie.title}</div>
            ))}
        </div>
    );
};
