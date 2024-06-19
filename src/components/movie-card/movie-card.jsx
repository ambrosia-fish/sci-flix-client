import PropTypes from "prop-types";

export const MovieCard = ({movie, onMovieClick}) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.Title}
        </div>
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
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};