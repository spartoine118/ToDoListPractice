import { AuthenticationClient } from "../authentication-proxy/authentication-client/authentication-client"
import { User } from "../authentication-proxy/interfaces"
import { ToDoListAPI } from "../to-do-list-proxy/to-do-list-client/to-do-client"
import { Response } from "express"

export type ResolverContext = {
  cookie: string
  user: User | null
  res: Response<any, Record<string, any>>
  dataSources: {
    toDoListAPI: ToDoListAPI
    authAPI: AuthenticationClient
  }
}
