import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { ProfileEdit } from "../profile-edit/profile-edit.jsx";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// MainView component
export const MainView = () => {
  // Retrieve stored user and token from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // State variables for user, token, movies, and filter
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState(""); 

  // Effect to fetch movies if token is available
  useEffect(() => {
    if (!token) return;

    fetch("https://sci-flix-075b51101639.herokuapp.com/movies/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          genre: movie.Genre.Name,
          director: movie.Director.Name,
          poster: movie.Poster
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  // Filter movies based on filter state
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          {/* Route for signup */}
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          {/* Route for login */}
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView />
                  </Col>
                )}
              </>
            }
          />
          {/* Route for movie details */}
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          {/* Route for home */}
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The List is Empty!</Col>
                ) : (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Filter by title"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="mb-4"
                    />
                    {filteredMovies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          {/* Route for profile view */}
          <Route
            path="/profile/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView movies={movies} user={user} />
                  </Col>
                )}
              </>
            }
          />
          {/* Route for profile edit */}
          <Route
            path="/profile/edit"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileEdit />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
