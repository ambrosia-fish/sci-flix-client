import React, { useState, useEffect, useCallback } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { ProfileEdit } from "../profile-edit/profile-edit.jsx";
import { debounce } from 'lodash';

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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState([]);

  // Function to get the secondary genre
  const getSecondaryGenre = (genreIds) => {
    const secondaryGenre = genres.find(g => 
      genreIds.includes(g.id) && g.id !== 878
    );
    return secondaryGenre ? secondaryGenre.name : "General Science Fiction";
  };

  // Fetch genres once when component mounts
  useEffect(() => {
    if (!token) return;

    fetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(data => setGenres(data.genres))
      .catch(error => console.error("Error fetching genres:", error));
  }, [token]);

  // Process movie data
  const processMovieData = async (movieData) => {
    try {
      const creditsResponse = await fetch(
        `${TMDB_BASE_URL}/movie/${movieData.id}/credits?api_key=${TMDB_API_KEY}`
      );
      const creditsData = await creditsResponse.json();
      const director = creditsData.crew.find(
        (person) => person.job === "Director"
      );

      return {
        id: movieData.id,
        title: movieData.title,
        genre: getSecondaryGenre(movieData.genre_ids),
        director: director ? director.name : "Unknown",
        poster: movieData.poster_path ? `${TMDB_IMAGE_BASE_URL}${movieData.poster_path}` : null,
        description: movieData.overview,
        releaseDate: movieData.release_date,
        rating: movieData.vote_average,
        popularity: movieData.popularity
      };
    } catch (error) {
      console.error(`Error processing movie ${movieData.id}:`, error);
      return null;
    }
  };

  // Fetch movies function
  const fetchMovies = async (page, search = "") => {
    if (!token || loading || (!hasMore && !search)) return;

    setLoading(true);
    try {
      const endpoint = search
        ? `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(search)}&page=${page}`
        : `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=878&page=${page}&language=en-US&sort_by=popularity.desc&include_adult=false`;

      const response = await fetch(endpoint);
      const data = await response.json();

      const processedMovies = await Promise.all(
        data.results
          .filter(movie => search ? true : movie.genre_ids.includes(878))
          .map(processMovieData)
      );

      const validMovies = processedMovies.filter(movie => movie !== null);

      setMovies(prevMovies => 
        page === 1 ? validMovies : [...prevMovies, ...validMovies]
      );
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      setMovies([]);
      setCurrentPage(1);
      setHasMore(true);
      fetchMovies(1, query);
    }, 500),
    []
  );

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Initial load and infinite scroll
  useEffect(() => {
    if (!token) return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        if (hasMore && !loading) {
          setCurrentPage(prev => prev + 1);
          fetchMovies(currentPage + 1, searchQuery);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [token, currentPage, hasMore, loading, searchQuery]);

  // Initial fetch
  useEffect(() => {
    if (token && currentPage === 1) {
      fetchMovies(1, searchQuery);
    }
  }, [token]);

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
                ) : (
                  <>
                    <Form.Control
                      type="search"
                      placeholder="Search movies..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="mb-4"
                    />
                    <Row xs={3} md={4} lg={4} className="g-4">
                      {movies.map((movie) => (
                        <Col key={movie.id}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </Row>
                    {loading && (
                      <div className="text-center mt-4">
                        Loading more movies...
                      </div>
                    )}
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