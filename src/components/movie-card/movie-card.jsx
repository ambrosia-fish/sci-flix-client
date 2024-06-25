import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({movie, onMovieClick}) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src="https://placehold.co/400x600" />
            <Card.Body style={{}}>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Directed by: {movie.director}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">
                        Open
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string,
        Title: PropTypes.string,
        Director: PropTypes.shape({
            Name: PropTypes.string
        }),
        Genre: PropTypes.shape({
           Name: PropTypes.string
        }),
    }).isRequired
};