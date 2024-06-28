import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view.jsx';
import Container from 'react-bootstrap/Container';

import "./index.scss"; // Importing stylesheet for styling

// App component containing MainView wrapped in a Container
const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

// Selecting the root element and rendering the App component using React's createRoot
const container = document.querySelector("#root"); // Assuming there is a root element with id "root" in your HTML
const root = createRoot(container);

root.render(<App />); // Rendering the App component into the root element
