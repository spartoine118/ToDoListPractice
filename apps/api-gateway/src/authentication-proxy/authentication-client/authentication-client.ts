import axios, { AxiosInstance, AxiosResponse } from "axios"
import { LoginParams } from "../interfaces/login-params.interface"
import { User } from "../interfaces"

export class AuthenticationClient {
  constructor(readonly http: AxiosInstance) {}

  async login(params: LoginParams): Promise<AxiosResponse> {
    const response = await this.http.post("/login", params)

    return response
  }

  // TODO figure out what type the cookies are
  async authenticate(cookie: any): Promise<User> {
    const { data } = await this.http.get<User>("/authenticate", {
      headers: { cookie },
    })

    return data
  }

  async logout(cookie: any) {
    const data = await this.http.get("/logout", { headers: { cookie } })

    return data
  }
}

const instance = axios.create({
  baseURL: process.env.AUTH_SERVICE_URI,
  withCredentials: true,
})

export const authenticationClient = new AuthenticationClient(instance)
