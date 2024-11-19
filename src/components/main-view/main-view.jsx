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
import Container from "react-bootstrap/Container";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const TMDB_API_KEY = "8e3011e350263dd4204821f433206d67";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Function to get the secondary genre
  const getSecondaryGenre = (genreIds, genres) => {
    // Filter out Science Fiction (ID: 878) and get the first remaining genre
    const secondaryGenre = genres.find(g => 
      genreIds.includes(g.id) && g.id !== 878
    );
    return secondaryGenre ? secondaryGenre.name : "General Science Fiction";
  };

  useEffect(() => {
    if (!token) return;

    const fetchMovies = async () => {
      try {
        // First fetch genres to have the complete list
        const genresResponse = await fetch(
          `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const genresData = await genresResponse.json();
        const genres = genresData.genres;

        // Then fetch movies
        const response = await fetch(
          `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=878&page=${currentPage}&language=en-US&sort_by=popularity.desc&include_adult=false`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const data = await response.json();
        
        // Transform TMDB data with secondary genre
        const moviesFromApi = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          genre: getSecondaryGenre(movie.genre_ids, genres),
          director: "",
          poster: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null,
          description: movie.overview,
          releaseDate: movie.release_date,
          rating: movie.vote_average,
          popularity: movie.popularity
        }));

        // Fetch directors
        const moviesWithDirectors = await Promise.all(
          moviesFromApi.map(async (movie) => {
            try {
              const creditsResponse = await fetch(
                `${TMDB_BASE_URL}/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}`
              );
              const creditsData = await creditsResponse.json();
              const director = creditsData.crew.find(
                (person) => person.job === "Director"
              );
              return {
                ...movie,
                director: director ? director.name : "Unknown"
              };
            } catch (error) {
              console.error(`Error fetching credits for movie ${movie.id}:`, error);
              return movie;
            }
          })
        );

        setMovies(moviesWithDirectors);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [token, currentPage]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

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
      <Container>
        <Routes>
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
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
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
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>Loading movies...</Col>
                ) : (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Filter by title"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="mb-4"
                    />
                    <Row xs={3} md={4} lg={4} className="g-4">
                      {filteredMovies.map((movie) => (
                        <Col key={movie.id}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </Row>
                    <div className="d-flex justify-content-center mt-4">
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <span className="mx-3 align-self-center">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
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
          <Route
            path="/profile/edit"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileEdit
                      user={user}
                      onUserUpdate={(updatedUser) => setUser(updatedUser)}
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};