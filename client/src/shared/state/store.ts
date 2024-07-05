import {
  TO_DO_STATE_KEY,
  toDoInitialState,
  toDoReducer,
  ToDoState,
} from "../../to-do-list/state/to-do-reducer"
import { Action } from "./actions"
import { useCallback, useEffect, useRef, useState } from "react"

// export type GlobalState = Record<string, object>

export interface GlobalState {
  [TO_DO_STATE_KEY]: ToDoState
}

const globalInitialState: GlobalState = {
  TO_DO: toDoInitialState,
}

export type ReducerFunction = (
  state: GlobalState,
  action: Action
) => GlobalState

export type ReducersDictionary = Record<string, object>

const reducers: ReducersDictionary = {
  [TO_DO_STATE_KEY]: toDoReducer,
}

class Store {
  private state: GlobalState
  private reducers: ReducersDictionary
  private listeners = new Set<(state: GlobalState) => void>()

  constructor(
    reducers: ReducersDictionary,
    state: GlobalState = globalInitialState
  ) {
    this.reducers = reducers
    this.state = this.reduce({ type: "none", payload: {} }, state)
  }

  // TODO Come back to this and properly type the reducers dictionary
  private reduce(action: Action, state: GlobalState): GlobalState {
    const newState = Object.values(this.reducers).reduce(
      (prevState, currReducer: any) => {
        return currReducer(prevState, action)
      },
      state
    )

    return newState as GlobalState
  }

  getState(): GlobalState {
    return this.state
  }

  getReducers(): ReducersDictionary {
    return this.reducers
  }

  dispatch(action: Action): void {
    this.state = this.reduce(action, this.state)
    this.listeners.forEach((fn) => fn(this.state))
  }

  subscribe(fn?: any): () => void {
    fn(this.state)
    this.listeners.add(fn)

    return () => {
      this.listeners.delete(fn)
    }
  }
}

export const store = new Store(reducers)

export function useSelector(fn?: any): GlobalState {
  const storeRef = useRef(store)
  const [state, setState] = useState<GlobalState>(store.getState())

  useEffect(() => {
    const unsubscribe = storeRef.current.subscribe(setState)

    return () => unsubscribe()
  })

  const result = fn ? fn(state) : state
  return result
}

export function useDispatch(action: any): (action: Action) => void {
  const dispatch =
    typeof action === "function"
      ? useCallback(action, [])
      : useCallback((action: Action) => store.dispatch(action), [])
  return dispatch
}
