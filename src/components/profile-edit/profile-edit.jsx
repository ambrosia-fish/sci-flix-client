import { useState } from "react";
import { Form, Button } from 'react-bootstrap';

// ProfileEdit component
export const ProfileEdit = () => {
  // State variables for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  
  // Retrieve token and user from localStorage
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Function to handle form submission for updating user
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    };

    fetch(`https://sci-flix-075b51101639.herokuapp.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        alert("User updated successfully");
        console.log(response);
        localStorage.removeItem('token'); 
        localStorage.removeItem('user');
        window.location.reload();
      } else {
        response.text().then((text) => alert(`Update failed: ${text}`));
      }
    }).catch((error) => {
      console.error('Error:', error);
      alert(`Update failed: ${error.message}`);
    });
  };

  // Function to handle user deletion
  const handleDeleteUser = (event) => {
    event.preventDefault();

    fetch(`https://sci-flix-075b51101639.herokuapp.com/users/${user.username}`, { 
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      method: "DELETE"
    }).then((response) => {
      if (response.ok) {
        alert(`${user.username} was deleted successfully`); 
        window.location.reload();
      } else {
        response.text().then((text) => alert(`Deletion failed: ${text}`));
      }
    }).catch((error) => {
      console.error('Error:', error);
      alert(`Deletion failed: ${error.message}`);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formUserName'>
        <Form.Label>New Username:</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength="3"
          required
        />
      </Form.Group>

      <Form.Group controlId='formPassword'>
        <Form.Label>New Password:</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId='formEmail'>
        <Form.Label>New Email:</Form.Label>
        <Form.Control
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId='formBirthday'>
        <Form.Label>New Birthday:</Form.Label>
        <Form.Control
          type='date'
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
      <Button variant='danger' onClick={handleDeleteUser} style={{ marginLeft: '10px' }}>
        Delete User
      </Button> 
    </Form>
  );
};
