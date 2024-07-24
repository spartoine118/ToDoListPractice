import gql from "graphql-tag"

export const typeDefs = gql`
  type ToDoItem {
    id: ID!
    name: String!
    complete: Boolean!
  }

  type Query {
    toDoItem(id: ID!): ToDoItem
    toDoItems: [ToDoItem!]!
  }
`
