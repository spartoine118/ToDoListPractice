import { User } from "../../authentication-proxy/interfaces"

export type WithUser<T> = {
  user: User
} & T
