import { Action, ActionFailedPayload } from "../../shared/state/actions"
import { ToDoItemInterface } from "../core/interfaces/item.interface"

export enum ToDoEvents {
  GET_TODO = "GET_TODO",
  GET_TODO_SUCCESS = "GET_TODO_SUCCESS",
  GET_TODO_FAIL = "GET_TODO_FAIL",
  UPDATE_TODO = "UPDATE_TODO",
  UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_FAIL = "UPDATE_TODO_FAIL",
}

export class GetToDo implements Action {
  type = ToDoEvents.GET_TODO
  // TODO Change this later we should be able to make one without a payload
  payload = {}
}

export interface GetToDoSuccessPayload {
  toDoItems: ToDoItemInterface[]
}

export class GetToDoSuccess implements Action {
  type = ToDoEvents.GET_TODO_SUCCESS

  constructor(readonly payload: GetToDoSuccessPayload) {
    this.payload = payload
  }
}

export class GetToDoFail implements Action {
  type = ToDoEvents.GET_TODO_FAIL

  constructor(readonly payload: ActionFailedPayload) {}
}
export class UpdateToDo implements Action {
  type = ToDoEvents.UPDATE_TODO
  payload = {}
}

export interface UpdateToDoSuccessPayload {
  updated: ToDoItemInterface
}

export class UpdateToDoSuccess implements Action {
  type = ToDoEvents.UPDATE_TODO_SUCCESS

  constructor(readonly payload: UpdateToDoSuccessPayload) {}
}

export class UpdateToDoFail implements Action {
  type = ToDoEvents.UPDATE_TODO_FAIL

  constructor(readonly payload: ActionFailedPayload) {}
}

export type ToDoActions =
  | GetToDo
  | GetToDoFail
  | GetToDoSuccess
  | UpdateToDo
  | UpdateToDoSuccess
  | UpdateToDoFail
