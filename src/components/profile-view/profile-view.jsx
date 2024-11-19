import React, { useState, useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card.jsx";

export const ProfileView = ({ movies, user }) => {
  const [refreshedUser, setRefreshedUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`https://sci-flix-075b51101639.herokuapp.com/users/${user.username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched user data:", data);
        setRefreshedUser(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [user.username, token]);

  // Filter movies to get the user's favorite movies
  let favoriteMovies = [];
  if (refreshedUser && refreshedUser.favoriteMovies && movies.length > 0) {
    console.log("Favorite movie IDs:", refreshedUser.favoriteMovies);
    console.log("Available movies:", movies.map(m => ({ id: m.id, title: m.title })));
    
    favoriteMovies = movies.filter((movie) => 
      refreshedUser.favoriteMovies.includes(movie.id.toString())
    );
    
    console.log("Filtered favorite movies:", favoriteMovies);
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>User Profile</Card.Title>
        <Card.Text>
          <strong>Username:</strong> {user.username} <br />
          <strong>Email:</strong> {user.email} <br />
        </Card.Text>
        
        <h3 className="mt-4 mb-3">Favorite Movies</h3>
        {favoriteMovies.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {favoriteMovies.map((movie) => (
              <Col key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        ) : (
          <p>No favorite movies found.</p>
        )}

        <div className="mt-4">
          <Link to="/profile/edit" className="btn btn-primary me-2">
            Edit Profile
          </Link>
          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};