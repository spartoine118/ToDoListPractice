import gql from "graphql-tag"

export const typeDefs = gql`
  enum Role {
    ADMIN
    CUSTOMER
  }

  type User {
    _id: ID!
    email: String!
    role: Role!
  }

  type ToDoItem {
    id: ID!
    name: String!
    complete: Boolean!
  }

  type Query {
    toDoItem(id: ID!): ToDoItem
    toDoItems: [ToDoItem!]!
  }

  input UpdateToDoItem {
    id: ID!
    name: String!
    complete: Boolean!
  }

  type Mutation {
    updateToDoItem(item: UpdateToDoItem!): ToDoItem
  }
`
