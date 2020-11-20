import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://adminlab.tk/graphql',
  cache: new InMemoryCache()
});

export default client;