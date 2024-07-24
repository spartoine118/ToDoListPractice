import { ToDoItemInterface } from "./interfaces"
import { RESTDataSource } from "@apollo/datasource-rest"

export class ToDoListAPI extends RESTDataSource {
  // TODO Change this to an env var later
  baseURL = "http://to-do-list:3001"

  getToDos(): Promise<ToDoItemInterface[]> {
    console.log("Making Request")
    const data = this.get<ToDoItemInterface[]>("/to-do-list").catch((e) => {
      console.log(e)
      return e
    })

    return data
  }

  getToDo(id: string): Promise<ToDoItemInterface[]> {
    const data = this.get<ToDoItemInterface[]>(`/to-do-list/${id}`)

    return data
  }

  updateToDo(updated: ToDoItemInterface): Promise<ToDoItemInterface> {
    const data = this.put<ToDoItemInterface>("/", { body: updated })

    return data
  }
}
