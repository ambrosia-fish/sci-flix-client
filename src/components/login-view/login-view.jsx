import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// LoginView component
export const LoginView = ({}) => {
    // State variables for username and password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents default form submission behavior

        const data = {
            username: username,
            password: password

        };

        // API call to login endpoint
        fetch("https://sci-flix-075b51101639.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok) {} // Placeholder for handling non-OK responses
            return response.json(); // Parse JSON response
        })
        .then((data) => {
            if (data.user) {
                // Save user data and token to localStorage
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);  
            } else {
                alert("No such user"); // Alert if no user found
            }
        })
        .then(() => {
            window.location.href = "/"; // Redirect to home page
        })
        .catch((e) => {
            alert("Something went wrong"); // Alert on error
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formUserName'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group>

            <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />    
            </Form.Group>
            <Button variant='primary' type='submit'>
                Submit
            </Button>
        </Form>
    );
};
