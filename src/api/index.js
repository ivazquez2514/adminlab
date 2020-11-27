import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://adminlab.tk/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authInfo = JSON.parse(localStorage.getItem('adminlab-auth'));

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authInfo ? `Bearer ${authInfo.token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;