import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import { httpClient } from "./http-client"

export class AuthenticationClient {
  private bearerToken = ""

  constructor(private readonly http: AxiosInstance) {
    // this.http.interceptors.request.use((request) =>
    //   this.tokenAuthInterceptor(request)
    // )
  }

  async login(payload: { id: string }): Promise<void> {
    const { data } = await this.http.post<{ token: string }>(
      "/auth/login",
      payload
    )

    // this.bearerToken = data.token
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

export const authClient = new AuthenticationClient(httpClient)
