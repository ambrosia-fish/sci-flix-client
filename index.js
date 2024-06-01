// import express, morgan, fs, path
const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');

// create top 10 films array
//create accessLogStream to log requests to log.txt file.
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'),{flags: 'a'});

//triggers morgan to log request to accessLogStream and terminal
app.use(morgan('combined', {stream: accessLogStream}));
app.use(morgan('common'));

let topTenFilms = [
    {
        title: '2001: A Space Odyssey',
        director: 'Stanley Kubrick'
    },
    {
        title: 'Blade Runner',
        director: 'Ridley Scott'
    },
    {
        title: 'Alien',
        director: 'Ridley Scott'
    },
    {
        title: 'The Thing',
        director: 'John Carpenter'
    },
    {
        title: 'The Terminator',
        director: 'James Cameron'
    },
    {
        title: 'The Matrix',
        director: 'The Wachowski Sisters'
    },
    {
        title: 'Back to the Future',
        director: 'Robert Zemeckis'
    },
    {
        title: 'Arrival',
        director: 'Denis Villeneuve'
    },
    {
        title: 'Dune: Part Two',
        director: 'Denis Villeneuve'
    },
    {
        title: 'Jurassic Park',
        director: 'Steven Spielberg'
    },
];

// get request returns top 10 json array
app.get('/TopTen', (req,res) => {
    res.json(topTenFilms);
});

// any unspecified request returns welcome message
app.get('/', (req,res) => {
    res.send('Welcome to Sci-Flix!');
})

// route any static request to it's corresponding file in the public folder
app.use(express.static('public'));
