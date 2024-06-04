//import express, morgan, fs, path
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

//create app for express
const app = express();

//create accessLogStream to log requests to log.txt file.
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'),{flags: 'a'});

//triggers morgan to log request to accessLogStream and terminal
app.use(morgan('combined', {stream: accessLogStream}));
app.use(morgan('common'));

//create top 10 films array
let topTenFilms = [
//create top 10 movies array
let movies = [
    {
        title: "2001: A Space Odyssey",
        year: "1968",
        director: "Stanley Kubrick",
        subgenre: "Epic",
        description: "A visually stunning sci-fi epic exploring human evolution, AI, and cosmic mysteries in deep space."
    },
    {
        title: "Blade Runner",
        year: "1982",
        director: "Ridley Scott",
        subgenre: "Neo-noir",
        description: "In a dystopian future, a blade runner hunts down rogue androids while grappling with his own humanity."
    },
    {
        title: "Alien",
        year: "1979",
        director: "Ridley Scott",
        subgenre: "Horror",
        description: "The crew of the Nostromo battles a terrifying alien life form in this suspenseful and claustrophobic horror classic."
    },
    {
        title: "The Thing",
        year: "1982",
        director: "John Carpenter",
        subgenre: "Horror",
        description: "An Antarctic research team encounters a shape-shifting alien that can imitate any creature, leading to paranoia and terror."
    },
    {
        title: "The Terminator",
        year: "1984",
        director: "James Cameron",
        subgenre: "Action",
        description: "A relentless cyborg assassin is sent from the future to kill Sarah Connor, the mother of a future resistance leader."
    },
    {
        title: "The Matrix",
        year: "1999",
        director: "The Wachowski Sisters",
        subgenre: "Action",
        description: "A hacker discovers the shocking truth about his reality and leads a rebellion against the machines controlling it."
    },
    {
        title: "Back to the Future",
        year: "1985",
        director: "Robert Zemeckis",
        subgenre: "Adventure",
        description: "Teenager Marty McFly travels back to 1955 and must ensure his parents meet and fall in love to return to the present."
    },
    {
        title: "Arrival",
        year: "2016",
        director: "Denis Villeneuve",
        subgenre: "Drama",
        description: "A linguist works to communicate with mysterious alien visitors and unravels profound implications for humanity and herself."
    },
    {
        title: "Dune: Part Two",
        year: "2024",
        director: "Denis Villeneuve",
        subgenre: "Epic",
        description: "Paul Atreides continues his journey on Arrakis, facing new challenges and consolidating his power against formidable foes."
    },
    {
        title: "Jurassic Park",
        year: "1993",
        director: "Steven Spielberg",
        subgenre: "Adventure",
        description: "A revolutionary theme park with living dinosaurs turns deadly as the prehistoric creatures break free and hunt the visitors."
    }
];

//get request returns top 10 json array
app.get('/TopTen', (req,res) => {
    res.json(topTenFilms);
});

//get request returns title, yaer, director, subgenre and description for movieName.
app.get('/movies/:moviename',(req,res) =>{
    res.status(200).send("Placeholder Movie Metadata")
});

app.get('/genres/:genre', (req,res) =>{
    res.status(200).send("Genre Description")
});

app.get('/directors/:directorName', (req, res) => {
    res.status(200).send("Director Metadata")
}); 

app.post('/users', (req, res) => {
    res.status(201).send("New User Created")
});

app.patch('/users/:username', (req,res) => {
    res.status(201).send("Username Updated")
}); 

app.post('/users/favorites', (req, res) => {
    res.status(200).send("Movie added to favorites")
});

app.delete('/users/favorites/:movie', (req, res) => {
    res.status(200).send("Movie Removed from Favorites")
});

app.delete('/users/:user', (req, res) => {
    res.status(200).send("User Deleted")
});

// //get request returns top 10 json array
// app.get('/TopTen', (req,res) => {
//     res.json(topTenmovies);
// });

//any unspecified request returns welcome message
app.get('/', (req,res) => {
    res.send('Welcome to Sci-Flix!');
})

//route any static request to it's corresponding file in the public folder
app.use(express.static('public'));


//create port for request listening
app.listen(8080, () =>{
    console.log('It\'s working! It\'s working!')
});



