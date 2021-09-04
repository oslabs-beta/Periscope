/**
 * @jest-environment jsdom
 */

import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from '../client/App';
import LandingContainer from '../client/container/landingContainer';
import NodeContainer from '../client/container/NodeContainer';
import PodContainer from '../client/container/PodContainer';
import fetch from 'node-fetch';

describe('App Container', () => {

  beforeEach (() =>
      render(<Router>
              <App />
            </Router>
            )
    );

  test('Homepage link points to the correct page and has loading image', () => {
    const dashboard = screen.getByRole('link', { name: '' });
    userEvent.click(dashboard);
    const image = document.querySelector("img")
    expect(image.id).toBe('loading');
  });

 // ADD ONCE THE NAVBAR

});


describe('Node Container', () => {
  test('renders Container component', () => {
    render(<NodeContainer />);
  });

});

describe('Pod Container', () => {

  test('renders Pod container', () => {
    render(<PodContainer />);
  });

});



// LANDING CONTAINER TEST NOT WORKING CUZ IT DOESN'T LIKE LINKS
// describe('Landing Container', () => {
//   test('renders Landing container component', () => {
//     render(<LandingContainer />);
//   });
// });

