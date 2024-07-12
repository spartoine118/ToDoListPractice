import { store } from "../../shared/state/store"
import { ToDoItemInterface } from "../core/interfaces/item.interface"
import { toDoClient } from "../core/to-do-client"
import {
  GetToDo,
  GetToDoFail,
  GetToDoSuccess,
  UpdateToDo,
  UpdateToDoFail,
  UpdateToDoSuccess,
} from "./to-do-actions"

export async function getToDoThunk() {
  store.dispatch(new GetToDo())
  try {
    const data = await toDoClient.getToDo()

    store.dispatch(new GetToDoSuccess({ toDoItems: data }))
  } catch (error) {
    store.dispatch(new GetToDoFail(error))
  }
}

export async function updateToDoThunk(updated: ToDoItemInterface) {
  store.dispatch(new UpdateToDo())

  try {
    const data = await toDoClient.updateToDo(updated)

    store.dispatch(new UpdateToDoSuccess({ updated: data }))
  } catch (error) {
    store.dispatch(new UpdateToDoFail(error))
  }
}
