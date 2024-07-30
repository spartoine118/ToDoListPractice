import { logger } from "../logger/logger"

export const resolvers = {
  Query: {
    toDoItems: (parent, args, context, info) => {
      logger(`Resolver: ${JSON.stringify(context)}`)
      return context.dataSources.toDoListAPI.getToDosByUser(context.user)
    },
    toDoItem: (parent, args, context, info) => {
      return context.dataSources.toDoListAPI.getToDo(context.user)
    },
  },
  Mutation: {
    updateToDoItem: (parent, args, context, info) => {
      return context.dataSources.toDoListAPI.updateToDo(args.item)
    },
  },
}
