import { Action } from "../../shared/state/actions"
import { User } from "../core/interfaces"
import { AuthenticationEvents } from "./authentication-actions"

export interface AuthenticationState {
  user: User | null
  loading: boolean
  error: string
}

export const AUTHENTICATION_STATE_KEY = "AUTH"

interface PartialAuthenticationState {
  [AUTHENTICATION_STATE_KEY]: AuthenticationState
}

export const authenticationInitialState: AuthenticationState = {
  user: null,
  loading: false,
  error: "",
}

export function authenticationReducer(
  state: PartialAuthenticationState,
  action: Action
): PartialAuthenticationState {
  switch (action.type) {
    case AuthenticationEvents.LOGIN: {
      const newState: PartialAuthenticationState = {
        ...state,
        AUTH: {
          ...state[AUTHENTICATION_STATE_KEY],
          loading: true,
          error: "",
        },
      }

      return newState
    }

    case AuthenticationEvents.LOGIN_SUCCESS: {
      const newState: PartialAuthenticationState = {
        ...state,
        AUTH: {
          ...state[AUTHENTICATION_STATE_KEY],
          user: action.payload as User,
          loading: false,
          error: "",
        },
      }

      return newState
    }

    case AuthenticationEvents.LOGIN_FAIL: {
      const newState: PartialAuthenticationState = {
        ...state,
        AUTH: {
          ...state[AUTHENTICATION_STATE_KEY],
          loading: false,
          error: JSON.stringify(action.payload),
        },
      }

      return newState
    }

    case AuthenticationEvents.LOGOUT: {
      const newState: PartialAuthenticationState = {
        ...state,
        AUTH: {
          ...state[AUTHENTICATION_STATE_KEY],
          loading: true,
          error: "",
        },
      }

      return newState
    }

    case AuthenticationEvents.LOGOUT_SUCCESS: {
      const newState: PartialAuthenticationState = {
        ...state,
        AUTH: {
          ...state[AUTHENTICATION_STATE_KEY],
          user: null,
          loading: false,
          error: "",
        },
      }

      return newState
    }

    case AuthenticationEvents.LOGOUT_FAIL: {
      const newState: PartialAuthenticationState = {
        ...state,
        AUTH: {
          ...state[AUTHENTICATION_STATE_KEY],
          loading: false,
          error: JSON.stringify(action.type),
        },
      }

      return newState
    }

    default:
      return state
  }
}
