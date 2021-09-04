import { render, fireEvent } from '@testing-library/react';

import App from '../client/App.jsx';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
  });
});
