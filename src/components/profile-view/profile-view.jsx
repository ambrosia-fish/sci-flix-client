import React from "react";
import { useParams } from "react-router";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";




export const ProfileView = ({ movies, onUpdateUser, onDeregister }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    favoriteMovieList = user.favoriteMovies


  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>User Profile</Card.Title>
          <Card.Text>
            Username: {user.username}  <br />
            Email: {user.email} <br />          
            Favorite Movies: 
              <ul>
              {favoriteMovieList.map((movie, index) => (
                <li key={index}>{movie}</li>
              ))}
            </ul>
          </Card.Text>
          <Link to="/profile/edit">Edit Profile</Link>
          <br />
          <Link to="/">Back to Home</Link>
        </Card.Body>
      </Card>
    </div>
  );
};

// create buttons that corresspond to the requests / endpoints for updating all info.
// a form will have to be created and we can use that data and send it via the request