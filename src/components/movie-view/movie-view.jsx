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
    
    useEffect(() => {
        if (!user || !token || !movie) return;

        fetch(`https://sci-flix-075b51101639.herokuapp.com/users/${user.username}`, {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response => response.json())
        .then(userData => {
            console.log("User Data:", userData);
            console.log("Movie ID to check:", movie.id.toString());
            console.log("User's favorites:", userData.favoriteMovies);
            
            const favoriteExists = userData.favoriteMovies && 
                userData.favoriteMovies.includes(movie.id.toString());
            console.log("Is favorite:", favoriteExists);
            setIsFavorite(favoriteExists);
        })
        .catch(error => {
            console.error('Error checking favorites:', error);
        });
    }, [movieId, user, token, movie]);

    const toggleFavorite = async () => {
        if (!movie || !user || !token) return;
    
        try {
            const requestBody = { movieId: movie.id.toString() };
            console.log('Sending request with body:', requestBody);
    
            const response = await fetch(
                `https://sci-flix-075b51101639.herokuapp.com/users/${user.username}/favorites`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestBody)
                }
            );
    
            const data = await response.json();
            console.log("Full server response:", {
                status: response.status,
                data: data
            });
            
            if (response.ok) {
                setIsFavorite(data.isFavorite);
                console.log(`Movie ${data.isFavorite ? 'added to' : 'removed from'} favorites`);
            } else {
                console.error('Server error details:', {
                    status: response.status,
                    error: data.error
                });
            }
        } catch (error) {
            console.error('Error toggling favorite:', {
                message: error.message,
                error: error
            });
        }
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