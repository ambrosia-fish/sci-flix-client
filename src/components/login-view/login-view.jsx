import React, { useState } from "react";

// Define the LoginView component, which takes an onLoggedIn prop
export const LoginView = ({ onLoggedIn }) => {
    // useState hook to manage the username state
    const [username, setUsername] = useState("");
    // useState hook to manage the password state
    const [password, setPassword] = useState("");
    
    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        // Create a data object with username and password
        const data = {
            username: username,
            password: password
        };

        // Make a POST request to the login endpoint
        fetch("sci-flix-075b51101639.herokuapp.com/login", {
            method: "POST", // Specify the request method
            headers: {
                "Content-Type": "application/json" // Set the content type to JSON
            },
            body: JSON.stringify(data) // Convert the data object to a JSON string
        })
        .then((response) => response.json()) // Parse the response JSON
        .then((data) => {
            console.log("Login response: ", data); // Log the response data to the console
            if (data.user) {
                // If user data is present, save it to local storage
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                // Call the onLoggedIn callback with user and token
                onLoggedIn(data.user, data.token);
            } else {
                // If no user data, show an alert
                alert("No such user");
            }
        })
        .catch((e) => {
            // Handle any errors that occur during the fetch
            alert("Something went wrong");
        });
    };

    // Render the login form
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                {/* Input field for the username */}
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Password:
                {/* Input field for the password */}
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">
                Submit
            </button>
        </form>
    );
};
