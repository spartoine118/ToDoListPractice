import { Action } from "../../shared/state/actions"
import { ToDoItemInterface } from "../core/interfaces/item.interface"
import { GetToDoSuccessPayload, ToDoEvents } from "./to-do-actions"

export interface ToDoState {
  entities: Omit<ToDoItemInterface, "id">[]
  ids: string[]
  loading: boolean
  error: string
}

export const TO_DO_STATE_KEY = "TO_DO"

interface PartialToDoState {
  [TO_DO_STATE_KEY]: ToDoState
}

export const toDoInitialState: ToDoState = {
  entities: [],
  ids: [],
  loading: false,
  error: "",
}

export function toDoReducer(
  state: PartialToDoState,
  action: Action
): PartialToDoState {
  switch (action.type) {
    case ToDoEvents.GET_TODO: {
      const newState: PartialToDoState = {
        ...state,
        TO_DO: {
          ...state[TO_DO_STATE_KEY],
          loading: true,
          error: "",
        },
      }

      return newState
    }

    case ToDoEvents.GET_TODO_SUCCESS: {
      const payload = action.payload as GetToDoSuccessPayload

      const ids = payload.toDoItems.map((val) => val.id)
      const entities = payload.toDoItems.map(({ id, ...val }) => val)

      const newState: PartialToDoState = {
        ...state,
        TO_DO: {
          ...state[TO_DO_STATE_KEY],
          loading: false,
          error: "",
          ids,
          entities,
        },
      }

      return newState
    }

    case ToDoEvents.GET_TODO_FAIL: {
      const newState: PartialToDoState = {
        ...state,
        TO_DO: {
          ...state[TO_DO_STATE_KEY],
          error: JSON.stringify(action.payload),
          loading: false,
        },
      }

      return newState
    }
    default:
      return state
  }
}

export const selectToDoState = (state: PartialToDoState) =>
  state[TO_DO_STATE_KEY]

export const selectToDoLoading = (state: PartialToDoState) =>
  selectToDoState(state).loading

export const selectToDoEntities = (state: PartialToDoState) =>
  selectToDoState(state).entities

export const selectToDoIds = (state: PartialToDoState) =>
  selectToDoState(state).ids

export const selectToDoErrors = (state: PartialToDoState) =>
  selectToDoState(state).error
