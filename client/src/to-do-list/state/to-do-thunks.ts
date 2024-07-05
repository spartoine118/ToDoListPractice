import { store } from "../../shared/state/store"
import { toDoClient } from "../core/to-do-client"
import { GetToDo, GetToDoFail, GetToDoSuccess } from "./to-do-actions"

export async function getToDoThunk() {
  store.dispatch(new GetToDo())
  try {
    const data = await toDoClient.getToDo()

    store.dispatch(new GetToDoSuccess({ toDoItems: data }))
  } catch (error) {
    store.dispatch(new GetToDoFail(error))
  }
}
