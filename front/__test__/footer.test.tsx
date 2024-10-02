import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../src/components/footer';

describe('Footer Component', () => {
  test('renders the footer with correct text content', () => {
    // Rendre le composant Footer
    render(<Footer />);

    // Vérifier que le texte est présent dans le footer
    const footerText = screen.getByText(/© 2024 Autolog. All rights reserved./i);
    expect(footerText).toBeInTheDocument(); // Vérifie si le texte est dans le document
  });
});
