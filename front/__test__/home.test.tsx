import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page'; // Assurez-vous que le chemin est correct

describe('Home Component', () => {
  test('renders Home component', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to AutoLog')).toBeInTheDocument();
  });
  test('renders the image correctly', () => {
    render(<Home />)
    const image = screen.getByAltText('Image illustrating AutoLog features');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'home.jpeg');
  });
});
