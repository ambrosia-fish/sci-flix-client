// Require mongoose
const mongoose = require('mongoose');

// Create/define movieSchema's data format
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String,
        Birth: Date,
        Death: Date,
    },
    Actiors: [String],
    ImagePath: String,
    Featured: Boolean
});

// Create/define userSchema's data format
let userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref:'movie'}]
});

// Create * export models
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;