import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password  
        };

        fetch("https://sci-flix-075b51101639.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok) {}
            return response.json();
        })
        .then((data) => {
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);  
                onLoggedIn(data.user, data.token);
            } else {
                alert("No such user");
            }
        })
        .then(() => {
            console.log(data.username)
        })
        .catch((e) => {
            alert("Something went wrong");
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

