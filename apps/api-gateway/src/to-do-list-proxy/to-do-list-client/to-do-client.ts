import { User } from "../../authentication-proxy/interfaces"
import { WithUser } from "../../core/interfaces"
import { SuccessResponse, ToDoItemInterface } from "../interfaces"
import { RESTDataSource } from "@apollo/datasource-rest"

export class ToDoListAPI extends RESTDataSource {
  baseURL = process.env.TODO_SERVICE_URI

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

  async getToDo({
    id,
    user,
  }: WithUser<{ id: string }>): Promise<ToDoItemInterface[]> {
    const data = await this.post<ToDoItemInterface[]>(`/to-do-list/${id}`, {
      body: { user },
    })

    return data
  }

  async updateToDo({
    user,
    updated,
  }: WithUser<{ updated: ToDoItemInterface }>): Promise<ToDoItemInterface> {
    const data = await this.put<ToDoItemInterface>(
      `/to-do-list/${updated.id}`,
      {
        body: { user, data: updated },
      }
    )

    return data
  }

  async deleteToDo({
    user,
    id,
  }: WithUser<{ id: string }>): Promise<SuccessResponse> {
    const data = await this.delete<SuccessResponse>(`/to-do-list/${id}`, {
      body: { user },
    })

    return data
  }
}
