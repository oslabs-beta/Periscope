/**
 * @jest-environment jsdom
 */

import { render, screen, cleanup, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from '../client/App';
import LandingContainer from '../client/container/landingContainer';
import NodeContainer from '../client/container/NodeContainer';
import PodContainer from '../client/container/PodContainer';
import fetch from 'node-fetch';
import '@testing-library/jest-dom';



describe('Home Page & Navbar tests', () => {

  beforeEach (() => render(<Router> <App /> </Router>));

  test('Header links to node page', () => {
    const dashboard = screen.getByRole('button', { name: 'Node Dashboard' });
    userEvent.click(dashboard);
    const image = document.querySelector("img")
    expect(image.id).toBe('logo');
  });

  test('Header links to pod page', () => {
    const dashboard = screen.getByRole('button', { name: 'Pod Dashboard' });
    userEvent.click(dashboard);
    const memoryTitle = screen.getByText('Pod Memory Usage');
    expect(memoryTitle.textContent).toEqual('Pod Memory Usage');
  });


});


describe('Node Container', () => {

  beforeEach (() =>  render(<NodeContainer />));

  test('renders Node loading component', () => {
    const loading = screen.getByRole('img');
    expect(loading.id).toEqual('loading');
  });

});

describe('Pod Container', () => {

  beforeEach (() =>  render(<PodContainer />));


  test('renders Pod container', () => {
    const cpu = screen.getByText('CPU Usage');
    expect(cpu.textContent).toBe('CPU Usage');
  });

  test('has list of pods', () => {
    const pods = document.querySelector('.pod-table');
    expect(pods).toBeTruthy();
  });

});


