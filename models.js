// Require mongoose and bcrypt
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    birthday: Date,
    favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

// hashes password
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};
  
// Validate password method 
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


// Create * export models
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;