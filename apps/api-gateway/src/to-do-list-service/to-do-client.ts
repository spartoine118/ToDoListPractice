import { User } from "../authentication-proxy/interfaces"
import { ToDoItemInterface } from "./interfaces"
import { RESTDataSource } from "@apollo/datasource-rest"

export class ToDoListAPI extends RESTDataSource {
  // TODO Change this to an env var later
  baseURL = "http://to-do-list:3001/to-do-list"

  async getToDos(): Promise<ToDoItemInterface[]> {
    const data = await this.get<ToDoItemInterface[]>("/to-do-list")

    return data
  }

  async getToDosByUser(user: User): Promise<ToDoItemInterface[]> {
    const data = await this.post<ToDoItemInterface[]>("/to-do-list", {
      body: { user },
    })

    return data
  }

  async getToDo(id: string): Promise<ToDoItemInterface[]> {
    const data = await this.get<ToDoItemInterface[]>(`/to-do-list/${id}`)

    return data
  }

  async updateToDo(updated: ToDoItemInterface): Promise<ToDoItemInterface> {
    const data = await this.put<ToDoItemInterface>("/to-do-list", {
      body: updated,
    })

    return data
  }
}
