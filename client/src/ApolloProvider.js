import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import App from './App';
import { AuthProvider } from './context/auth';

// connects to graphql server
const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

// used to add token to user's header
const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create new apollo client (which can take children by default)
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  // onError: ({ networkError, graphQLErrors }) => {
  //   console.log('graphQLErrors', graphQLErrors);
  //   console.log('networkError', networkError);
  // },
});

export default (
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>
);
