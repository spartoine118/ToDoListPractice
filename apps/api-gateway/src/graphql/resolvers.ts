import { GraphQLError } from "graphql"
import { ResolverContext } from "./context"
import { IResolvers } from "@graphql-tools/utils"

type Resolver = (parent, args, context: ResolverContext, info) => any

function auth(resolver: Resolver) {
  return async (parent, args, context: ResolverContext, info) => {
    const user = await context.dataSources.authAPI.authenticate(context.cookie)

    if (!user)
      throw new GraphQLError("User is not authorized", {
        extensions: {
          code: "UNAUTHORIZED",
          http: { status: 401 },
        },
      })

    return resolver(parent, args, { ...context, user }, info)
  }
}

export const resolvers: IResolvers<any, ResolverContext> = {
  Query: {
    toDoItems: auth((parent, args, context, info) => {
      return context.dataSources.toDoListAPI.getToDosByUser(context.user)
    }),
    toDoItem: auth((parent, args, context, info) => {
      return context.dataSources.toDoListAPI.getToDo({
        id: args.id,
        user: context.user,
      })
    }),
  },
  Mutation: {
    updateToDoItem: auth((parent, args, context, info) => {
      return context.dataSources.toDoListAPI.updateToDo({
        user: context.user,
        updated: args.item,
      })
    }),
    deleteToDoItem: auth((parent, args, context, info) => {
      return context.dataSources.toDoListAPI.deleteToDo({
        id: args.id,
        user: context.user,
      })
    }),
    login: async (parent, args, context, info) => {
      const x = await context.dataSources.authAPI.login(args.credentials)
      context.res.header({ "set-cookie": x.headers["set-cookie"] })
      return x.data
    },
    logout: auth(async (parent, args, context, info) => {
      await context.dataSources.authAPI.logout(context.cookie)
      context.res.clearCookie("JWT")
      return { success: true }
    }),
    authenticate: auth((parent, args, context, info) => {
      return context.user
    }),
  },
}
