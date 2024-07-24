import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { resolvers } from "./graphql/resolvers"
import { ToDoListAPI } from "./to-do-list-service/to-do-client"
import { typeDefs } from "./graphql/schema"
import { DataSourceContext } from "./graphql/context"

// async function startApolloServer() {
//   const server = new ApolloServer({ typeDefs, resolvers })

//   const { url } = await startStandaloneServer(server, {
//     context: async () => {
//       const { cache } = server
//       return {
//         dataSources: {
//           toDoListAPI: new ToDoListAPI({ cache }),
//         },
//       }
//     },
//     listen: { port: 3000 },
//   })
//   console.log(`
//       🚀  Server is running!
//       📭  Query at ${url}
//     `)
// }

// startApolloServer()
