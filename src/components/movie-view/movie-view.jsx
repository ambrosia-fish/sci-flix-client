import "./movie-view.scss";
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <Card className="h-100 ">
                <img className="moviePoster" src="https://placehold.co/400x600" />
                <Card.Body style={{}}>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>Directed by: {movie.director}</Card.Text>
                </Card.Body>
            </Card> 
            <Button onClick={onBackClick} className="back-button">Back</Button>
        </div>
    );
};
