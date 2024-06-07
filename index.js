//import express, morgan, fs, path
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Models = require('./models.js');
const bodyParser = require('body-parser');

// create model objects for movies and users
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://127.0.0.1:27017/sci-flix', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

//create app for express
const app = express();

//create accessLogStream to log requests to log.txt file.
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'),{flags: 'a'});

//triggers morgan to log request to accessLogStream and terminal
app.use(morgan('combined', {stream: accessLogStream}));
app.use(morgan('common'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//get request returns list of all movies via JSON
app.get('/movies', async (req,res) => {
    await Movies.find()
    .then((movies) => {
        res.status(201).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err)
    });
});

//get request returns title, yaer, director, subgenre and description for movieName.
app.get('/movies/:Title', async (req,res) =>{
    await Movies.findOne({Title: req.params.Title})
    .then((movie) => {
        res.json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: + err')
    })
});


// get returns data about genre

app.get('/movies/genre/:genreName', async (req, res) => {
    await Movies.findOne({'Genre.Name': req.params.genreName})
    .then((movie) => {
        if (!movie) {
            return res.status(404).send("Genre not found");
        }
        res.json({genreDescription: movie.Genre.Description});
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});


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



