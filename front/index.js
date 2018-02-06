import 'jquery';
import 'semantic-ui-css/semantic.css';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';

import './index.scss';

const API_SERVER_URL = process.env.API_SERVER_URL || 'http://127.0.0.1:5000/';

const client = new ApolloClient({
  link: new HttpLink({ uri: `${API_SERVER_URL}graphql` }),
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app'),
);
