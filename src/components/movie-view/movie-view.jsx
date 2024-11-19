import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./movie-view.scss";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === parseInt(movieId, 10));
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const [isFavorite, setIsFavorite] = useState(false);
    
    // Check if movie is in user's favorites when component mounts
    useEffect(() => {
        if (!user || !token || !movie) return;

        fetch(`https://sci-flix-075b51101639.herokuapp.com/users/${user.username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch user data');
            }
        })
        .then(userData => {
            // Check if the movie ID exists in user's favorites
            const favoriteExists = userData.FavoriteMovies.includes(movie.id.toString());
            setIsFavorite(favoriteExists);
        })
        .catch(error => {
            console.error('Error checking favorites:', error);
            setIsFavorite(false);
        });
    }, [movieId, user, token]);

    const toggleFavorite = () => {
        fetch(`https://sci-flix-075b51101639.herokuapp.com/users/${user.username}/favorites`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newFavorite: movieId }),
        }).then((response) => {
            if (response.ok) {
                setIsFavorite(!isFavorite); // Toggle the heart state
            } else {
                response.text().then((text) => alert(`Update failed: ${text}`));
            }
        }).catch((error) => {
            console.error('Error:', error);
            alert(`Update failed: ${error.message}`);
        });
    };

    if (!movie) {
        return (
            <div>
                <p>Loading movie details...</p>
                <Link to="/">
                    <Button variant="primary">Back</Button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            <Card className="h-100">
                <img 
                    className="moviePoster" 
                    src={movie.poster} 
                    alt={`Poster for ${movie.title}`}
                />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                        <strong>Directed by:</strong> {movie.director}<br />
                        <strong>Genre:</strong> {movie.genre}<br />
                        {movie.description && (
                            <>
                                <strong>Description:</strong><br />
                                {movie.description}
                            </>
                        )}
                    </Card.Text>
                    <div className="d-flex gap-2">
                        <Button 
                            variant="primary" 
                            onClick={toggleFavorite}
                            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                        </Button>
                        <Link to="/">
                            <Button variant="primary">Back</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};