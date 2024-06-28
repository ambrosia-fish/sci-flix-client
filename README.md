# Sci-Flix

Sci-Flix is a web application and API focused on sci-fi films. It allows users to browse, search, and interact with a collection of sci-fi movies. Users can register, log in, and manage their profiles, including adding favorite movies. The API supports fetching movie data and user authentication for secure access.

## Features

- **Browse Movies:** View a collection of sci-fi movies.
- **Search:** Search for movies by title, director, or genre.
- **User Authentication:** Register, log in, and manage user profiles.
- **Favorite Movies:** Users can mark movies as favorites.
- **Profile Management:** Edit user profiles, including username, password, email, and birthday.

## Technologies Used

- **Frontend:** React.js, React Router, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Styling:** SCSS for custom styling

## Installation

1. Clone the repository:

2. Install dependencies via npm install:
   (see package.json)

3. Set up environment variables:

- Create a `.env` file in the root directory.
- Define environment variables:
  ```
  PORT=3000
  MONGODB_URI=mongodb://localhost:27017/sci-flix
  JWT_SECRET=your_jwt_secret
  ```

4. Start the server:

5. Open the application:

- Open `http://localhost:3000` in your browser.

## API Endpoints

- **POST /login:** Authenticate user and generate JWT token.
- **POST /signup:** Create a new user account.
- **GET /movies:** Fetch all movies.
- **GET /movies/:id:** Fetch a specific movie by ID.
- **POST /users/:username/favorites:** Add or remove a movie from user's favorites.
- **PATCH /users/:username:** Update user profile.
- **DELETE /users/:username:** Delete user account.
