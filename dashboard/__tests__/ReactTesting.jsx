/**
 * @jest-environment jsdom
 */

import { render, screen, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from '../client/App';
import LandingContainer from '../client/container/landingContainer';
import NodeContainer from '../client/container/NodeContainer';
import PodContainer from '../client/container/PodContainer';
import fetch from 'node-fetch';

// describe('Home Page & Navbar tests', () => {

//   beforeEach (() => render(<Router> <App /> </Router>));
//   afterEach(cleanup);

//   test('Homepage link points to the correct page and has loading image', () => {
//     const dashboard = screen.getByRole('link', { name: '' });
//     userEvent.click(dashboard);
//     const image = document.querySelector("img")
//     expect(image.id).toBe('loading');
//   });

//   test('Header links to node page', () => {
//     const dashboard = screen.getByRole('button', { name: 'Node Dashboard' });
//     userEvent.click(dashboard);
//     const image = document.querySelector("img")
//     expect(image.id).toBe('loading');
//   });

//   test('Header links to pod page', () => {
//     const dashboard = screen.getByRole('button', { name: 'Pod Dashboard' });
//     userEvent.click(dashboard);
//     const memoryTitle = screen.getByText('Pod Memory Usage');
//     expect(memoryTitle.textContent).toEqual('Pod Memory Usage');
//   });


// });


describe('Node Container', () => {

  beforeEach (() =>  render(<NodeContainer />));

  test('renders Node loading component', () => {
    const loading = screen.getByRole('img');
    expect(loading.id).toEqual('loading');
  });

  test('renders Node component when loading is done', async () => {
    await waitFor(() => screen.findByText(pathname).toBe('/'))
    const cpu = await screen.findByText('CPU Usage');
    expect(cpu).toBeInDocument();
  });


});

// describe('Pod Container', () => {

//   test('renders Pod container', () => {
//     render(<PodContainer />);
//   });

// });
