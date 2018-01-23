import 'jquery'
import 'semantic-ui-css/semantic.css'
import './index.css'

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag'

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:5000/graphql' }),
    cache: new InMemoryCache()
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('app')
);
