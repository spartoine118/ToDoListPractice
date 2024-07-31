import express from "express"
import cors from "cors"
import { ApolloServer } from "@apollo/server"
import { resolvers } from "./graphql/resolvers"
import { typeDefs } from "./graphql/schema"
import { expressMiddleware } from "@apollo/server/express4"
import { ToDoListAPI } from "./to-do-list-proxy/to-do-list-client/to-do-client"
import { authenticationClient } from "./authentication-proxy/authentication-client/authentication-client"
import { loggerExpressMiddleware } from "./core/logger/logger"

const port = process.env.SERVICE_PORT

async function startApolloServer() {
  await server.start()

  app.use(loggerExpressMiddleware())

  app.use(
    "/",
    cors({
      origin: process.env.CLIENT_URI ?? "http://localhost:4200",
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const { cache } = server

        return {
          cookie: req.headers.cookie,
          res,
          user: null,
          dataSources: {
            toDoListAPI: new ToDoListAPI({ cache }),
            authAPI: authenticationClient,
          },
        }
      },
    })
  )

  app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
  })
}

export const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  status400ForVariableCoercionErrors: true,
})

startApolloServer()
