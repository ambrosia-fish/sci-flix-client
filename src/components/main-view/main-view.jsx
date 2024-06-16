import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            "Poster":"https://upload.wikimedia.org/wikipedia/en/thumb/1/11/2001_A_Space_Odyssey_%281968%29.png/220px-2001_A_Space_Odyssey_%281968%29.png",
            "Title": "2001: A Space Odyssey",
            "Description": "A visually stunning sci-fi epic exploring human evolution, AI, and cosmic mysteries in deep space.",
            "Genre": {
              "Name": "Epic",
              "Description": "Epic films are a style of filmmaking with large-scale, sweeping scope, and spectacle."
            },
            "Director": {
              "Name": "Stanley Kubrick",
              "Bio": "Stanley Kubrick was an American film director, producer, screenwriter, and photographer.",
              "Birth": "1928",
              "Death": "1999"
            }
          },
          {
            "Poster":"https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Blade_Runner_%281982_poster%29.png/220px-Blade_Runner_%281982_poster%29.png",
            "Title": "Blade Runner",
            "Description": "In a dystopian future, a blade runner hunts down rogue androids while grappling with his own humanity.",
            "Genre": {
              "Name": "Neo-noir",
              "Description": "Neo-noir is a modern or contemporary motion picture rendition of film noir, emphasizing cynical attitudes and sexual motivations."
            },
            "Director": {
              "Name": "Ridley Scott",
              "Bio": "Sir Ridley Scott is an English film director and producer, known for his stylish visuals and innovative storytelling.",
              "Birth": "1937",
              "Death": ""
            }
          },
          {
            "Poster": "https://upload.wikimedia.org/wikipedia/en/c/c3/Alien_movie_poster.jpg",
            "Title": "Alien",
            "Description": "The crew of the Nostromo battles a terrifying alien life form in this suspenseful and claustrophobic horror classic.",
            "Genre": {
              "Name": "Horror",
              "Description": "Horror films are intended to, or have the capacity to frighten, scare, or disgust."
            },
            "Director": {
              "Name": "Ridley Scott",
              "Bio": "Sir Ridley Scott is an English film director and producer, known for his stylish visuals and innovative storytelling.",
              "Birth": "1937",
              "Death": ""
            }
            }
        ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if(selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if(movies.length === 0) {
        return <div>The list is empty</div>
    };

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                key={movie.Title}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    );
};
