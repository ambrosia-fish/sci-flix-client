import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (loginData) => {
        fetch("https://sci-flix-075b51101639.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        .then((response) => {
            if (!response.ok) {}
            return response.json();
        })
        .then((data) => {
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);  
            } else {
                alert("No such user");
            }
        })
        .then(() => {
            window.location.href = "/";
        })
        .catch((e) => {
            alert("Something went wrong");
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin({
            username: username,
            password: password
        });
    };

    const handleGuestLogin = () => {
        handleLogin({
            username: "Guest",
            password: "GuestPassword"
        });
    };

    return (
        <div className="login-container">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUserName">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />    
                </Form.Group>
                <div className="mt-3 space-x-2">
                    <Button className="login-button" variant="primary" type="button"
                        onClick={handleSubmit}
                    >
                        
                        Login
                    </Button>
                    <Button className="login-button" variant="primary" type="button"
                        onClick={handleGuestLogin}
                    >
                        Guest Login
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LoginView;