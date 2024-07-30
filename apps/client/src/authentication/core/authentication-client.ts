import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import { User } from "./interfaces"

export interface LoginParams {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export class AuthenticationClient {
  private bearerToken = ""

  constructor(private readonly http: AxiosInstance) {
    // this.http.interceptors.request.use((request) =>
    //   this.tokenAuthInterceptor(request)
    // )
  }

  async login(payload: LoginParams): Promise<User> {
    const { data } = await this.http.post<LoginResponse>("/login", payload)

    this.bearerToken = data.token

    return data.user
  }

  async logout(): Promise<void> {
    await this.http.get("/logout")

    this.bearerToken = ""
  }

  authorized(): void {
    this.http.get("/auth/authorized")
  }

  private tokenAuthInterceptor(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    const authorization = this.bearerToken
      ? { Authorization: `Bearer ${this.bearerToken}` }
      : {}

    return {
      ...config,
      headers: {
        ...config.headers,
        ...authorization,
      },
    } as InternalAxiosRequestConfig
  }
}

const instance = axios.create({
  url: "http://localhost:3000/",
  baseURL: "http://localhost:3000/",
  withCredentials: true,
})

export const authenticationClient = new AuthenticationClient(instance)
