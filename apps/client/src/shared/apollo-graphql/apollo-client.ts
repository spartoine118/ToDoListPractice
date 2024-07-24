import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

export const apolloClient = new ApolloClient({
  uri: "http://localhost:3000/",
  cache: new InMemoryCache(),
})
