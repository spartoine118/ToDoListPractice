import express from "express"
import cors from "cors"
import { ApolloServer } from "@apollo/server"
import { resolvers } from "./graphql/resolvers"
import { typeDefs } from "./graphql/schema"
import { expressMiddleware } from "@apollo/server/express4"
import { ToDoListAPI } from "./to-do-list-service/to-do-client"
import { authenticationClient } from "./authentication-proxy/authentication-client/authentication-client"
import { GraphQLError } from "graphql"
import { logger, loggerExpressMiddleware } from "./logger/logger"

const port = 3000

async function startApolloServer() {
  await server.start()

  app.use(loggerExpressMiddleware())

  app.post(
    "/login",
    cors({ origin: "http://localhost:4200/login", credentials: true }),
    express.json(),
    async (req, res) => {
      try {
        const axiosRes = await authenticationClient.login(req.body)

        logger(`Request Headers Origin: ${JSON.stringify(req.headers.origin)}`)

        res
          .header({
            ...axiosRes.headers,
            "Access-Control-Allow-Origin": req.headers["origin"],
          })
          .send(axiosRes.data)
      } catch (error) {
        logger(JSON.stringify(error), "error")

        res
          .header({ "Access-Control-Allow-Origin": req.headers["origin"] })
          .send(error)
      }
    }
  )

  app.get(
    "/logout",
    cors({ origin: "http://localhost:4200/logout", credentials: true }),
    express.json(),
    async (req, res) => {
      try {
        const axiosRes = await authenticationClient.logout(req.headers.cookie)

        res
          .header({
            ...axiosRes.headers,
            "Access-Control-Allow-Origin": req.headers["origin"],
          })
          .send(axiosRes.data)
      } catch (error) {
        logger(JSON.stringify(error), "error")

        res
          .header({ "Access-Control-Allow-Origin": req.headers["origin"] })
          .send(error)
      }
    }
  )

  app.use(
    "/",
    cors({ origin: "http://localhost:4200", credentials: true }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const { cache } = server
        const user = await authenticationClient.authenticate(req.headers.cookie)

        if (!user)
          throw new GraphQLError("User is not authenticated", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          })

        return {
          user,
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
