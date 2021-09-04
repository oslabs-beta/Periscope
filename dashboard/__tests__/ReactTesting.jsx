/**
 * @jest-environment jsdom
 */

/**
 * render: lets us render the component (like how React would)
 * screen: Your utility for finding elements the same way the user does
 **/

import { render, screen } from '@testing-library/react';
// import React so you can use JSX (React.createElement) in your test
import React from 'react';
import LandingContainer from '../client/container/landingContainer';
import NodeContainer from '../client/container/NodeContainer';
import PodContainer from '../client/container/PodContainer';
import fetch from 'node-fetch';


describe('Node Container', () => {
  test('renders Container component', () => {
    render(<NodeContainer />);
  });
});

describe('Pod Container', () => {

  const testProps = {
    currentMemory = {{[{metric:{instance: 1}}, {values: [[100,2], [101,3], [140,4]]}]}};
    
  }

  test('renders Pod container', () => {
    render(<PodContainer />);
  });

  test('Pod container contains one component', () => {
    const


  })



});



// LANDING CONTAINER TEST NOT WORKING CUZ IT DOESN'T LIKE LINKS
// describe('Landing Container', () => {
//   test('renders Landing container component', () => {
//     render(<LandingContainer />);
//   });
// });

