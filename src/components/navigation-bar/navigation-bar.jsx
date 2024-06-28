import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

// NavigationBar component
export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* Brand logo that links to the home page */}
        <Navbar.Brand as={Link} to="/">
          Sci-Flix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Links for unauthenticated users */}
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {/* Links for authenticated users */}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile/">
                  Profile
                </Nav.Link>
                {/* Logout link */}
                <Nav.Link onClick={onLoggedOut} to="/">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
