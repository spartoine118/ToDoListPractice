import express from "express"
import cors from "cors"
import { ApolloServer } from "@apollo/server"
import { DataSourceContext } from "./graphql/context"
import { resolvers } from "./graphql/resolvers"
import { typeDefs } from "./graphql/schema"
import { expressMiddleware } from "@apollo/server/express4"
import { ToDoListAPI } from "./to-do-list-service/to-do-client"

const port = 3000

async function startApolloServer() {
  await server.start()
  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async () => {
        const { cache } = server
        return {
          dataSources: {
            toDoListAPI: new ToDoListAPI({ cache }),
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

const server = new ApolloServer({ typeDefs, resolvers })

startApolloServer()
