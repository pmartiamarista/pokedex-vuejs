import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

// HTTP connection to the API
const httpLink = (uri) => createHttpLink({ uri });

// Cache implementation
const cache = new InMemoryCache();

const clientVercel = new ApolloClient({
  link: httpLink('https://graphql-pokeapi.vercel.app/api/graphql'),
  cache,
});

const clientPokeApi = new ApolloClient({
  link: httpLink('https://beta.pokeapi.co/graphql/v1beta'),
  cache,
});

const apolloProvider = new VueApollo({
  clients: {
    vercel: clientVercel,
    pokeapi: clientPokeApi,
  },
  defaultClient: clientVercel,
})

export default apolloProvider;