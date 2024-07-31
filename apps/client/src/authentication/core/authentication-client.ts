import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import { User } from "./interfaces"
import { apolloClient } from "../../shared/apollo-graphql/apollo-client"
import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client"

export interface LoginCredentials {
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

  async login(payload: LoginCredentials): Promise<User> {
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

export class AuthClient {
  constructor(readonly http: ApolloClient<NormalizedCacheObject>) {}

  async login(credentials: LoginCredentials): Promise<User> {
    const LOGIN = gql`
      mutation Login($credentials: LoginCredentials!) {
        login(credentials: $credentials) {
          _id
          email
          role
        }
      }
    `

    const { data } = await this.http.mutate<{ login: User }>({
      mutation: LOGIN,
      variables: { credentials },
    })

    if (data?.login) {
      return data.login
    }

    throw Error("Error")
  }

  async logout(): Promise<boolean> {
    const LOGOUT = gql`
      mutation Logout {
        logout {
          success
        }
      }
    `
    const { data } = await this.http.mutate<{ success: boolean }>({
      mutation: LOGOUT,
    })

    return !!data?.success
  }

  async authenticate(): Promise<User> {
    const AUTHENTICATE = gql`
      mutation Authenticate {
        authenticate {
          _id
          email
          role
        }
      }
    `

    const { data } = await this.http.mutate<{ authenticate: User }>({
      mutation: AUTHENTICATE,
    })

    if (data?.authenticate) {
      return data.authenticate
    }
    throw Error("Error")
  }
}

export const authClient = new AuthClient(apolloClient)
