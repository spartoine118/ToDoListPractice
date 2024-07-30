import { ToDoListAPI } from "../to-do-list-service/to-do-client"

export type DataSourceContext = {
  dataSources: {
    toDoListAPI: ToDoListAPI
  }
}
