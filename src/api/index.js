import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://45.79.22.211/graphql',
  cache: new InMemoryCache()
});

export default client;