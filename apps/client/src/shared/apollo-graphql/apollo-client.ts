import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client"
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename"

const removeTypenameLink = removeTypenameFromVariables()
const httpLink = new HttpLink({ uri: "http://localhost:3000/" })

export const apolloClient = new ApolloClient({
  link: from([removeTypenameLink, httpLink]),
  uri: "http://localhost:3000/",
  cache: new InMemoryCache(),
})
