import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./app"
import AppRoutes from "./app-routes"
import { ApolloProvider } from "@apollo/client"
import { apolloClient } from "./shared/apollo-graphql/apollo-client"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <AppRoutes />
    </ApolloProvider>
  </React.StrictMode>
)
