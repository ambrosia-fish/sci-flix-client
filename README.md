# Sci-Flix React Frontend

A responsive React-based web application for exploring and interacting with a science fiction movie database.

## Overview

The Sci-Flix React Frontend is a responsive web application designed to provide users with an engaging interface for exploring a movie database. This frontend interacts with the [Sci-Flix Movie API](https://github.com/ambrosia-fish/sci-flix) to fetch and display movie information, manage user accounts, and handle user favorites.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- **Responsive Design**: Optimized for viewing on various devices and screen sizes
- **User Authentication**: Complete login and registration system with JWT
- **Movie Browsing**: Browse and search for movies with filtering options
- **Movie Details**: View comprehensive information about each movie
- **Favorites Management**: Save and manage favorite movies
- **Genre Exploration**: Browse movies by genre categories
- **Director Information**: Learn about movie directors and their works

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ambrosia-fish/sci-flix-client.git
   cd sci-flix-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to http://localhost:3000 to view the application.

## Usage

The application allows users to:
- Browse and search for movies
- View detailed information about each movie, including synopsis, genre, director, and more
- Create an account and log in
- Add and remove movies from their favorites list
- Update their profile information
- Filter movies by various criteria

## Project Structure

```
sci-flix-client/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # API service functions
│   ├── utils/           # Utility functions
│   ├── context/         # React context for state management
│   ├── assets/          # Static assets (images, icons)
│   ├── styles/          # CSS and styling files
│   ├── App.js           # Main application component
│   └── index.js         # Application entry point
├── public/              # Public assets
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## API Integration

The frontend communicates with the [Sci-Flix Movie API](https://github.com/ambrosia-fish/sci-flix) for all data needs. The API provides endpoints for:

- Movie data retrieval
- User authentication
- Profile management
- Favorites handling

Ensure the API is running and accessible for the frontend to function correctly.

## Technologies Used

- **React**: Core framework for building the UI
- **React Router**: For navigation and routing
- **Bootstrap/React Bootstrap**: For responsive design components
- **Redux**: For state management
- **Axios**: For API calls and data fetching
- **Parcel**: For bundling and development
- **JWT**: For authentication and session management
- **Lodash**: For utility functions

## Screenshots

*Screenshots will be added here to showcase the application's interface and key features.*

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Related Projects

- [Sci-Flix API](https://github.com/ambrosia-fish/sci-flix) - Backend API for this application
- [Sci-Flix Angular Client](https://github.com/ambrosia-fish/sciflix-angular-client) - Angular implementation of this client
