import { store } from "../../shared/state/store"
import { authClient, LoginCredentials } from "../core/authentication-client"
import {
  Login,
  LoginFail,
  LoginSuccess,
  LogoutAction,
  LogoutFail,
  LogoutSuccess,
} from "./authentication-actions"

export async function loginThunk(params: LoginCredentials) {
  store.dispatch(new Login())
  try {
    const user = await authClient.login(params)

    store.dispatch(new LoginSuccess(user))
  } catch (error) {
    store.dispatch(new LoginFail(error))
  }
}

export async function logoutThunk() {
  store.dispatch(new LogoutAction())
  try {
    const user = await authClient.logout()

    store.dispatch(new LogoutSuccess())
  } catch (error) {
    store.dispatch(new LogoutFail(error))
  }
}
