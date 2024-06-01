// import express, morgan, fs, path
const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');

// create top 10 films array
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
