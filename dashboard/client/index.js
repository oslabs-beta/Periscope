import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import style from './style.css';
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   useQuery,
//   gql,
// } from '@apollo/client';

// const client = new ApolloClient({
//   uri: '/graphql'
// })

render(
  <BrowserRouter>
    
      <App />
   
  </BrowserRouter>,
  document.getElementById('root')
);
