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
    toDoItemsByUser: [ToDoItem!]!
  }

  input UpdateToDoItem {
    id: ID!
    name: String!
    complete: Boolean!
  }

  type MutationSuccess {
    id: ID
    success: Boolean!
  }

  input LoginCredentials {
    email: String
    password: String
  }

  type Mutation {
    updateToDoItem(item: UpdateToDoItem!): ToDoItem
    deleteToDoItem(id: ID!): MutationSuccess
    login(credentials: LoginCredentials!): User
    logout: MutationSuccess
    authenticate: User
  }
`
