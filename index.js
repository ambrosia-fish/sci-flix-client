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


//get request returns list of all movies via JSON
app.get('/movies', (req,res) => {
    res.json(movies);
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



