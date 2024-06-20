import React, { useState, useEffect } from "react";


export const LoginView = () => {
    const [username, setUsername] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const data = {
            access: username,
            secret: password
        };
    }



    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type="password" />
            </label>
            <button type="submit">
                Submit
            </button>
        </form>
    );
};