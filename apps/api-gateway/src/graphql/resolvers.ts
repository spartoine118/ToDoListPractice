export const resolvers = {
  Query: {
    toDoItems: (parent, args, context, info) => {
      return context.dataSources.toDoListAPI.getToDos()
    },
    toDoItem: (parent, args, context, info) => {
      return context.dataSources.toDoListAPI.getToDo()
    },
  },
}
