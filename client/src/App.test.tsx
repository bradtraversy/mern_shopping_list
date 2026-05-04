import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders shopping list app', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/ShoppingList/i);
  expect(linkElement).toBeInTheDocument();
});
