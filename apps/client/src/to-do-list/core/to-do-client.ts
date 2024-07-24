import { ToDoItemInterface } from "./interfaces/item.interface"
import axios, { AxiosInstance } from "axios"
import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client"
import { apolloClient } from "../../shared/apollo-graphql/apollo-client"

export class ToDoClient {
  constructor(readonly http: ApolloClient<NormalizedCacheObject>) {}

  async getToDo(): Promise<ToDoItemInterface[]> {
    const GET_TO_DOS = gql`
      query toDoItems {
        toDoItems {
          name
          id
          complete
        }
      }
    `

    const {
      data: { toDoItems },
    } = await this.http.query<{ toDoItems: ToDoItemInterface[] }>({
      query: GET_TO_DOS,
    })

    return toDoItems
  }

  async updateToDo(updated: ToDoItemInterface): Promise<ToDoItemInterface> {
    const UPDATE_TO_DO = gql`
      mutation UpdateToDoItem($item: UpdateToDoItem!) {
        updateToDoItem(item: $item) {
          id
          name
          complete
        }
      }
    `

    const { data } = await this.http.mutate<{
      updateToDoItem: ToDoItemInterface
    }>({
      mutation: UPDATE_TO_DO,
      variables: { item: updated },
    })

    if (data?.updateToDoItem) {
      return data.updateToDoItem
    }

    throw Error("Error")
  }
}

export const toDoClient = new ToDoClient(apolloClient)
