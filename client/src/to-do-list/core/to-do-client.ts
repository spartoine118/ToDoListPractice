import { ToDoItemInterface } from "./interfaces/item.interface"
import axios, { AxiosInstance } from "axios"

export class ToDoClient {
  // TODO Change typing here
  constructor(readonly http: AxiosInstance) {}

  async getToDo(): Promise<ToDoItemInterface[]> {
    const { data } = await this.http.get<ToDoItemInterface[]>("/")

    return data
  }
}

// TODO Change this to an env var later
const http = axios.create({ baseURL: "http://localhost:3000/to-do-list" })

export const toDoClient = new ToDoClient(http)
