import { useState } from "react";

// Define the SignupView component
export const SignupView = () => {
  // useState hooks to manage the form fields' states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a data object with the form field values
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    // Make a POST request to the signup endpoint
    fetch("SIGNUP_URL", {
      method: "POST", // Specify the request method
      body: JSON.stringify(data), // Convert the data object to a JSON string
      headers: {
        "Content-Type": "application/json" // Set the content type to JSON
      }
    }).then((response) => {
      if (response.ok) {
        // If the response is ok, show a success alert and reload the page
        alert("Signup successful");
        window.location.reload();
      } else {
        // If the response is not ok, show a failure alert
        alert("Signup failed");
      }
    });
  };

  // Render the signup form
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        {/* Input field for the username */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </label>
      <label>
        Password:
        {/* Input field for the password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        {/* Input field for the email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        {/* Input field for the birthday */}
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
