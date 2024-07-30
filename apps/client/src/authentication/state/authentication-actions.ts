import { Action, ActionFailedPayload } from "../../shared/state/actions"
import { User } from "../core/interfaces"

export enum AuthenticationEvents {
  LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGOUT = "LOGOUT",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_FAIL = "LOGOUT_FAIL",
}

export class Login implements Action {
  type = AuthenticationEvents.LOGIN
  payload = {}
}

export class LoginSuccess implements Action {
  type = AuthenticationEvents.LOGIN_SUCCESS
  constructor(readonly payload: User) {
    this.payload = payload
  }
}

export class LoginFail implements Action {
  type = AuthenticationEvents.LOGIN_FAIL

  constructor(readonly payload: ActionFailedPayload) {}
}

export class LogoutAction implements Action {
  type = AuthenticationEvents.LOGOUT
  payload = {}
}

export class LogoutSuccess implements Action {
  type = AuthenticationEvents.LOGOUT_SUCCESS
  payload = {}
}

export class LogoutFail implements Action {
  type = AuthenticationEvents.LOGOUT_FAIL

  constructor(readonly payload: ActionFailedPayload) {}
}

export type AuthenticationActions =
  | Login
  | LoginSuccess
  | LoginFail
  | LogoutAction
  | LogoutSuccess
  | LogoutFail
