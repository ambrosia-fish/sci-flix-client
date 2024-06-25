import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

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
              setMovies(moviesFromApi)
              console.log("Fetch success!");
            })
            .catch(error => {
                console.error("Error fetching movies:", error);
            });
    }, [token]);
    
return (
  <Row>
    {!user ? (
      <Col md={5}>
        <LoginView onLoggedIn={(user) => setUser(user)} />
        or
        <SignupView />
      </Col>
    ) : selectedMovie ? (
      <Col> 
        <MovieView 
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </Col>  
    ) : movies.length === 0 ? (
      <div>Oi, the list is empty, bruv!</div>
    ) : (
      <>  
        <Button variant='primary' type='submit' onClick={() => { setUser(null); setToken(null); localStorage.clear();}}>Logout</Button>
        {movies.map((movie) => (
          <Col md={3}>
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ))}
      </>
    )}
  </Row>
  );
};

