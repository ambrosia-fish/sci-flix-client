import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card.jsx";

export const ProfileView = ({ movies, user }) => {
  const [refreshedUser, setRefreshedUser] = useState(null);

  useEffect(() => {
    fetch(`https://sci-flix-075b51101639.herokuapp.com/users/${user.username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRefreshedUser(data); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [user.username]); 

 
  let favoriteMovies = [];
  if (refreshedUser) {
    favoriteMovies = movies.filter((m) => refreshedUser.favoriteMovies.includes(m.id));
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>User Profile</Card.Title>
          <Card.Text>
            Username: {user.username} <br />
            Email: {user.email} <br />
            Favorite Movies:
            {favoriteMovies.length > 0 ? (
              <>
                {favoriteMovies.map((movie) => (
                  <Col className="mb-4" key={movie.title} md={3}>
                    <MovieCard key={movie.id} movie={movie} />
                  </Col>
                ))}
              </>
            ) : (
              <p>No favorite movies found.</p>
            )}
          </Card.Text>
          <Link to="/profile/edit">Edit Profile</Link>
          <br />
          <Link to="/">Back to Home</Link>
        </Card.Body>
      </Card>
    </div>
  );
};
