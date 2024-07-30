import { User } from "../authentication-proxy/interfaces"
import { ToDoListAPI } from "../to-do-list-service/to-do-client"

export type DataSourceContext = {
  user: User
  dataSources: {
    toDoListAPI: ToDoListAPI
  }
}
