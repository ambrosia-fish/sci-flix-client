import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card"
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);

    return (
        <div>
            <Card className="h-100 ">
                <img className="moviePoster" src="https://placehold.co/400x600" />
                <Card.Body style={{}}>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>Directed by: {movie.director}<br /> Subgenre: {movie.genre}</Card.Text>
                </Card.Body>
            </Card>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
}