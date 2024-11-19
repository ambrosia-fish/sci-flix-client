import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100">
            <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="text-decoration-none">
                <Card.Img variant="top" src={movie.poster} />
                <Card.Body>
                    <Card.Title className="text-light">{movie.title}</Card.Title>
                    <Card.Text className="text-muted">
                        Directed by: {movie.director}
                    </Card.Text>
                </Card.Body>
            </Link>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        director: PropTypes.string,
        genre: PropTypes.string,
        poster: PropTypes.string
    }).isRequired
};