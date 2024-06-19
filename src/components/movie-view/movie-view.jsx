export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <span>Title: {movie.title}</span>
            </div>
            <div>
                <span>Subgenre: {movie.genre}</span>
            </div>
            <div>
                <span>Director: {movie.director}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
