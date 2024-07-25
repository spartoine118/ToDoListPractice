export interface Action {
  type: string
  payload: object
}

export interface ActionFailedPayload {
  error: string
}
