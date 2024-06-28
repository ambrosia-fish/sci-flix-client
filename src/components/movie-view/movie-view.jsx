import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./movie-view.scss";
import { Button } from "react-bootstrap";

// MovieView component
export const MovieView = ({ movies }) => {
    // Extract movieId from URL parameters
    const { movieId } = useParams();
    // Find the movie in the movies array by ID
    const movie = movies.find((m) => m.id === movieId);
    // Retrieve user and token from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    // Function to add or remove movie from favorites
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
                alert("Favorite added or removed successfully");
            } else {
                response.text().then((text) => alert(`Update failed: ${text}`));
            }
        }).catch((error) => {
            console.error('Error:', error);
            alert(`Update failed: ${error.message}`);
        });
    };

    return (
        <div>
            <Card className="h-100">
                <img className="moviePoster" src={movie.poster} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>Directed by: {movie.director}<br /> Subgenre: {movie.genre}</Card.Text>
                    <Button onClick={toggleFavorite}>Add/remove as favorite</Button>
                </Card.Body>
            </Card>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};
