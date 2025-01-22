import { render, screen } from '@testing-library/react';
import App from './App';

// Define a test case
test('renders learn react link', () => {
  // Render the App component
  render(<App />);
  
  // Query for an element with the text "learn react"
  const linkElement = screen.getByText(/learn react/i);
  
  // Assert that the element is in the document
  expect(linkElement).toBeInTheDocument();
});